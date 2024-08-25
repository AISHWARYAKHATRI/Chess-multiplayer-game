import { GAME_EVENTS } from "@/app/data/constants";
import { Socket, io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

class SocketService {
  private socket: Socket | null = null;

  connect(token: string): void {
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: {
        token,
      },
    });
    this.socket.on("connect", () => {
      console.log("Connected");
    });
    this.socket.on("disconnect", () => {
      console.log("Disconnected");
    });
    this.socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket?.disconnect();
    }
  }

  on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event: string, data?: any): void {
    if (this.socket) {
      this.socket.emit(event, JSON.stringify(data));
    }
  }
}
const SocketConnection = new SocketService();
export default SocketConnection;
