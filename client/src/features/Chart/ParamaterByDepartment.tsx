import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';

import { Bar } from 'react-chartjs-2'
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { BigSpiner, Spinner } from "../../style/Spinner";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);


const ParamaterByDepartment = () => {

    const [dataPie, setDataPie] = useState<ChartData<"bar">>();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    useEffect(() => {
        agent.statistic.getTotalParamaterByDepartment(month).then(data => {
            console.log(data)
            setDataPie(
                {
                    labels: data.data.value.map(d => d.department),
                    datasets: [
                        {
                            label: 'Total paramater by department',
                            data: data.data.value.map(d => d.total),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.8)',
                                'rgba(54, 162, 235, 0.8)',
                                'rgba(255, 206, 86, 0.8)',
                                'rgba(75, 192, 192, 0.8)',
                                'rgba(153, 102, 255, 0.8)',
                                'rgba(255, 159, 64, 0.8)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 3,
                        },
                    ],
                }
            );

        })
    }, [month])

    if (!dataPie) return <Spinner />
    return (
        <div style={{ position: 'relative' }}>
            <select
                style={{
                    color: 'rgb(255, 99, 132)',
                    width: '90px',
                    position: "absolute",
                    top: '10px',
                    right: '10px'
                }}
                defaultValue={new Date().getMonth() + 1} onChange={(e) => setMonth(Number(e.target.value))}>
                <option value={1}>January</option>
                <option value={2}>Febuary</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
            </select>
            <Bar data={dataPie} />
        </div>


    )
}

export default ParamaterByDepartment;