import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export function OsArchitectureDonutNew() {
  let [chartDatApi, setChartDatApi] = useState([]);
  const getErrorWRTOSReducer = useSelector(
    (state) => state.getErrorWRTOSReducer
  );

  useEffect(() => {
    (async () => {
      const { data } = await getErrorWRTOSReducer;
      const piCount = data && data.typeWiseCount ? data.typeWiseCount : null;

      // console.log("piCount", piCount);

      const piCountData = await piCount.map((items) => items.count);
      // console.log("piCountData", piCountData);

      setChartDatApi(piCountData);
    })();
  }, []);

  const data = {
    labels: ["Windows", "Linux", "Others"],
    datasets: [
      {
        data: [chartDatApi[0], chartDatApi[1], chartDatApi[2]],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
        ],

        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
