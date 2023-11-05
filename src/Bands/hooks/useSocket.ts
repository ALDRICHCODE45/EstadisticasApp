import { useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";
interface ArgsReturn {
  socket: Socket;
  online: boolean;
}

// http://localhost:8080"
export const useSocket = (serverPath: string): ArgsReturn => {
  const socket = useMemo(
    () =>
      io(serverPath, {
        transports: ["websocket"],
        autoConnect: true,
      }),
    [serverPath]
  );

  const [online, setonline] = useState<boolean>(false);

  useEffect(() => {
    setonline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setonline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setonline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};
