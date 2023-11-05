import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import { Band } from "../interfaces/Bands";
import { Chart, ChartItem, registerables } from "chart.js";
export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const ctx = useRef(null);
  let myChart: any;

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      crearGrafica(bands);
    });
  }, [socket]);

  const crearGrafica = (bands: Band[] = []) => {
    Chart.register(...registerables);
    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx.current as unknown as ChartItem, {
      type: "bar",
      data: {
        labels: bands.map((banda) => banda.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map((banda) => banda.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: "y",
        scales: {
          xAxes: {
            stacked: true,
          },
        },
      },
    });
  };

  return (
    <>
      <div className="w-40">
        <canvas className="w-10 h-10" ref={ctx}></canvas>
      </div>
    </>
  );
};
