import React, {FC} from "react"
import styles from "./styles.module.scss";
import {Bar} from "react-chartjs-2";

export const StatsGraphic: FC = () => {
    let time = [
        ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    ];

    let data = {
        labels: [time[0]],
        datasets: [
            {
                data: [10]
            },
            {
                data: [6]
            },
            {
                data: [6.7]
            }
        ],
        barPercentage: 0.3
    };

    return (
        <div className={styles.wrapper}>
            <Bar data={data} />
        </div>
    )
}