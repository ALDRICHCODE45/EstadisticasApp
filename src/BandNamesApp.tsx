import { HomePage } from "./Bands/pages/HomePage";
import { SocketProvider } from "./Bands/context/SocketContext";

export const BandNamesApp = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};
