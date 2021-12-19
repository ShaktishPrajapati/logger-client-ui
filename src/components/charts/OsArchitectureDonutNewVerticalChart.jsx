import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },

    },
};




export function OsArchitectureDonutNewVerticalChart() {

    let [chartDatApi, setChartDatApi] = useState([]);
    // const [activeIndex, setactiveIndex] = useState(0)
    const getErrorWRTOSReducer = useSelector((state) => state.getErrorWRTOSReducer);
    const [labelData, setlabelData] = useState([])

    useEffect(() => {

        (async () => {
            const { data } = await getErrorWRTOSReducer;
            const piCount =
                data && data.typeWiseCount
                    ? data.typeWiseCount
                    : null;
            const piCountData = await piCount.map(items => items.count)
            setChartDatApi(piCountData);

            setlabelData(piCount.map(items => items._id))


            console.log("piCount", piCount)
            console.log("label data", labelData)
            // console.log("piCount", piCount)
            // console.log("piCountData", piCountData)
            // console.log("chartDatApi OS", piCount[0])
            // console.log("setChartDatApiWindow", chartDatApi.Window.map(item => item.count))
        })()

    }, [])

    const data = {
        labels: labelData,
        datasets: [
            {
                label: 'type wise count',
                data: [chartDatApi[0], chartDatApi[1], chartDatApi[2]],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return <Bar options={options} data={data} />;
}
