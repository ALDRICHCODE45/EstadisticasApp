import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { Socket } from "socket.io-client";
interface INITIAL_STATE {
  socket: Socket;
  online: boolean;
}

export const SocketContext = createContext({} as INITIAL_STATE);

interface props {
  children: JSX.Element | JSX.Element[];
}

export const SocketProvider = ({ children }: props) => {
  const { online, socket } = useSocket("http://localhost:8080");

  return (
    <SocketContext.Provider value={{ online, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
