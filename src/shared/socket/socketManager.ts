import { io, Socket } from "socket.io-client";
const WS_URL = import.meta.env.VITE_WS_URL;

// const dummy =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJuYW1lIjoiaGkyIiwiZW1haWwiOiJsaHN1bmc5OEBuYXZlci5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRLU3NjSkZoQ1l4ZXBTSHBReE1PYXd1cFBSbUZreGNtbGM3bEYyajM1TWt2dFlERHY2MS9JRyIsInR5cGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyNC0xMS0wNFQwNTo0ODoyNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNC0xMS0wNFQwNTo0ODoyNy4wMDBaIn0sInRva2VuVHlwZSI6ImFjY2Vzc190b2tlbiIsImlhdCI6MTczMDY5OTQyMiwiZXhwIjoxNzMwNzAzMDIyfQ.POdii1gGnefNaEAig7_3bIe0wsHFshqqkZJOH90zUZo";
class SocketManager {
  private socket: Socket | null = null;
  connect() {
    this.socket = io(WS_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  disconnect() {
    this.socket?.disconnect();
  }
  reconnect() {
    this.socket?.disconnect();
    this.socket?.connect();
  }

  on(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  isConnected() {
    return this.socket?.connected;
  }
}
const socketManager = new SocketManager();
export default socketManager;
