import socketManager from "@src/shared/socket/socketManager";
import { useEffect } from "react";

const useSocket = () => {
  const socket = socketManager;
  useEffect(() => {
    if (!socket.isConnected()) {
      socket.connect();
    }
  }, []);

  return socket;
};

export default useSocket;
