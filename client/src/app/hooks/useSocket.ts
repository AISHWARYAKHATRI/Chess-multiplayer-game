import { useEffect } from "react";
import SocketService from "@/app/api/services/socket";
import { useAppSelector } from "./useAppSelector";
import { GAME_EVENTS } from "../data/constants";
import { useAppDispatch } from "./useAppDispatch";
import { logout } from "../redux/slices/userSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useSocket = (event: string, data?: any) => {
  const token = useAppSelector((state) => state.auth.user?.access_token);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    try {
      SocketService.connect(token);
      SocketService?.on("connect", () => {
        SocketService.emit(event, data);
      });
      // Listens for unauthorized event, and logs out the user if emitted by the server
      SocketService.on(GAME_EVENTS.UNAUTHORIZED, (data) => {
        toast.error(data?.message);
        dispatch(logout());
      });
      SocketService.on(GAME_EVENTS.EXCEPTION, (gameData) => {
        toast.error(gameData?.message);
        router.push("/");
      });
    } catch (error) {}
    return () => {
      SocketService.disconnect();
    };
  }, []);
  return SocketService;
};
