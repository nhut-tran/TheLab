import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { getDate } from "../../utils/Date/DateHelper";
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
    ChartData
} from 'chart.js';

import { Line } from 'react-chartjs-2'
import { Spinner } from "../../style/Spinner";

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

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Total Paramaters by date per month',
        },
    },
};

const ParamaterByDate = () => {
    const [dataLine, setDataLine] = useState<ChartData<"line">>();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    useEffect(() => {
        agent.statistic.getTotalParamaterByDate(month).then(data => {
            getDate().then(date => date.map(d => ({ day: d.date, value: 0 }))).then((date) => {
                //convert array [{day: number, value: number}] to object {[day: number] : number (value)}
                const dateObj = date.reduce<{ [day: number]: number }>((obj, item) => ({ ...obj, [item.day]: item.value }), {})
                const dataObject = data.data.value.reduce<{ [day: number]: number }>((obj, item) => ({ ...obj, [item.day]: item.total }), {})
                //merge two objects
                for (let [key, val] of Object.entries(dataObject)) {
                    dateObj[Number(key)] = val;
                }
                setDataLine(
                    {
                        labels: Object.keys(dateObj),
                        datasets: [
                            {
                                label: 'Total paramater by date',
                                data: Object.values(dateObj),
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                        ],
                    }
                );
            })

        })
    }, [month])
    if (!dataLine) return <Spinner />

    return (
        <div style={{ position: 'relative' }} className="paramater-date">
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
            <Line data={dataLine} options={options} />
        </div>
    )
}

export default ParamaterByDate;