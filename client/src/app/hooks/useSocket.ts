import { useEffect } from "react";
import SocketService from "@/app/api/services/socket";
import { useAppSelector } from "./useAppSelector";
import { GAME_EVENTS } from "../data/constants";
import { useAppDispatch } from "./useAppDispatch";
import { logout } from "../redux/slices/userSlice";
import { toast } from "sonner";

export const useSocket = (event: string, data?: any) => {
  const token = useAppSelector((state) => state.auth.user?.access_token);
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
    } catch (error) {}
    return () => {
      SocketService.disconnect();
    };
  }, []);
  return SocketService;
};
