import React, {FC} from "react"
import styles from "./styles.module.scss";
import {Doughnut} from "@reactchartjs/react-chart.js";

// График-пончик

export const DoughnutGraphic: FC = () => {

    let data = {
        label: "Graph",
        dataset: [
            927, 163, 18
        ],
        backgroundColor: [
            '#red',
            '#blue',
            '#green'
        ]
    }

    return (
        <div className={styles.wrapper}>
            <Doughnut type={'doughnut'} data={data} />
        </div>
    )
}