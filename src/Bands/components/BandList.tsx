import { ReactElement, useContext, useEffect, useState } from "react";
import { Band } from "../interfaces/Bands";
import { SocketContext } from "../context/SocketContext";

export const BandList = (): ReactElement => {
  const { socket } = useContext(SocketContext);

  const [bands, setbands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on("current-bands", (bands: Band[]) => {
      setbands(bands);
      console.log(bands);
    });
  }, [socket]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newName = event.target.value;
    setbands((bands) =>
      bands!.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onPerdioFoco = (id: string, name: string) => {
    console.log(id, name);
    socket.emit("change-name", { id, newName: name });
  };

  const createRows = (): ReactElement[] => {
    return bands!.map((band) => (
      <tr key={band.id}>
        <td>
          <button
            onClick={() => socket.emit("increase-vote", band.id)}
            className="btn btn-primary"
          >
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form form-control"
            value={band.name}
            onChange={(event) => handleChange(event, band.id)}
            onBlur={() => onPerdioFoco(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            onClick={() => socket.emit("delete-band", band.id)}
            className="btn btn-danger"
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
