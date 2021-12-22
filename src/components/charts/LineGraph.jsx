import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useRef } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export function LineGraphNew() {
  let [chartDatApi, setChartDatApi] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const lineGraphRef = useRef(null);

  const getLogCountsByDateReducer = useSelector(
    (state) => state.getLogCountsByDateReducer
  );
  const { data } = getLogCountsByDateReducer;
  const LineCount =
    data && data.data && data.data.response ? data.data.response : null;

  useEffect(() => {
    let graphDataall = LineCount.map((items) => items.countLog);
    setChartDatApi(LineCount.map((item) => item.date));
    setGraphData(graphDataall);
  }, []);

  const alldata = {
    labels: chartDatApi,
    datasets: [
      {
        label: "Date wize count report",
        data: graphData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Container className="mt-5">
        <Line options={options} data={alldata} ref={lineGraphRef} />
      </Container>
    </>
  );
}
