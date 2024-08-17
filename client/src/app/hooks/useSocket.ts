import { useEffect } from "react";
import SocketService from "@/app/api/services/socket";
import { useAppSelector } from "./useAppSelector";

export const useSocket = (event: string, data?: any) => {
  const token = useAppSelector((state) => state.auth.user?.access_token);
  useEffect(() => {
    try {
      SocketService.connect(token);
      SocketService?.on("connect", () => {
        SocketService.emit(event, data);
      });
    } catch (error) {}
    return () => {
      SocketService.disconnect();
    };
  }, []);
  return SocketService;
};
