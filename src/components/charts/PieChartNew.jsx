import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);



export function PieChartNew() {

    let [chartDatApi, setChartDatApi] = useState([])


    // const [activeIndex, setactiveIndex] = useState(0)
    const getErrorWRTVersionReducer = useSelector(
        (state) => state.getErrorWRTVersionReducer
    );

    useEffect(() => {

        (async () => {
            const { data } = getErrorWRTVersionReducer;
            const piCount = await data && data.typeWiseCount[0].count ? data.typeWiseCount[0].count : null;
            setChartDatApi(piCount)
        })()




    }, [])

    const data = {
        labels: ['type wise count'],
        datasets: [
            {
                label: '# of Votes',
                data: [chartDatApi],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return <Pie data={data} />;
}
