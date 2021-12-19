import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function VerboseNewChart() {
  // let [chartDatApi, setChartDatApi] = useState([]);
  // let [logtypelabel, setLogtypelabel] = useState([]);
  const [chartData, setChartData] = useState([])
  const [chartDataLabel, setChartDataLabel] = useState([])


  const getLogCountsReducer = useSelector((state) => state.getLogCountsReducer);
  const getDataToChart = async () => {
    const { data } = await getLogCountsReducer;
    const piCount =
      data && data.data && data.data.typeWiseCount
        ? data.data.typeWiseCount
        : null;

    console.log("pieCount vs", piCount);
    setChartData(piCount.map(itmes => itmes.count))
    setChartDataLabel(piCount.map(itmes => itmes.logType))

    // console.log("piCount verbose", piCount.map(items => items.count));
    // const chartDataCount = await piCount.map(items => items.count);
    // setChartDatApi(chartDataCount);
    // console.log("verboser chart", piCount)
    // console.log("piCountData verbose", piCountData)
    // console.log("piCount verbose chart", piCount.map(logtype => logtype.logType))
    // const logtypelabel = piCount.map(logtype => logtype.logType)
    // setLogtypelabel(piCount.map(logtype => logtype.logType))
  }


  useEffect(() => {
    getDataToChart()
  }, [])



  const data = {
    labels: chartDataLabel,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          'rgba(54, 162, 235)',
          'rgba(255, 159, 64)',
          'rgba(153, 102, 255)',
          'rgba(255, 99, 132)',
          'rgba(255, 206, 86)',
        ],

        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
