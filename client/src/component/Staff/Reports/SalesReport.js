import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";
import { apiUrl } from '../../../server-config'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Title, Tooltip);

const SalesReport = ({ startDate, endDate }) => {

    const [chartData, setChartData] = useState({});
    const [isReady, setReady] = useState(false);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right',
            },
            title: {
                display: true,
                text: 'Monthly Sales by Order Type',
                font: {
                    size: '20',
                    weight: 'normal'
                }
            },
        },
    };

    useEffect(() => {

        if (startDate && endDate){
            fetch(`${apiUrl}/api/report/salesReport?startDate=${startDate}&endDate=${endDate}`,{
                headers: {
                    "authorization": localStorage.getItem('token'),
                  }
            })
            .then(res => res.json())
            .then(data => {
         //       console.log(data);
                setChartData({
                    labels: data.label,
                    datasets: data.data
                }
                );
                setReady(true);
            })
            .catch(err => alert(err));
        }
    }, [endDate, startDate])

    return (
        <>
            {isReady && chartData &&
                <Line options={options} data={chartData} />
            }
            {Object.keys(chartData).length === 0 && 
            <p>No data found.</p>}
        </>
    )
}

export default SalesReport