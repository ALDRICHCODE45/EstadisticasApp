import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const [name, setname] = useState<string>("");
  const { socket } = useContext(SocketContext);

  const handleSumbit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name.trim().length > 0) {
      socket.emit("create-band", { name });
      setname("");
    }
  };

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          className="form-control"
          placeholder="nuevo nombre"
          onChange={(ev) => setname(ev.target.value)}
        />
      </form>
    </>
  );
};
