import React, {FC, useEffect} from "react"
import styles from "./styles.module.scss";
import {Bar} from "react-chartjs-2"
import Chart from 'chart.js';


export const StatsGraphic: FC = () => {
    useEffect(() => {
        let ctx = document.getElementById('myChart');
        let time = [
            ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
        ];
        if (ctx) {
            let myChart = new Chart(ctx  as HTMLCanvasElement, {
                type: 'bar',
                data: {
                    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                    datasets: [
                        { // просмотры
                            data: [1600, 870, 900, 1700, 3600, 1200, 4050],
                            backgroundColor: '#1934F2',
                            barThickness: 15,
                        },
                        { // лайки
                            data: [5600, 2000, 1300, 3700, 7600, 5700, 6150],
                            backgroundColor: '#37D5FA',
                            barThickness: 15,

                        },
                        { // репосты
                            data: [1000, 6100, 6100, 5500, 1190, 5500, 1295 ],
                            backgroundColor: '#7832F0',
                            barThickness: 15,
                        },

                        // {
                        //     type: "line",
                        //     data:[0, 0, 0, 0, 0, 0, 0],
                        //     yAxisID: "line_"
                        // }
                    ],
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true,
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontColor:"#8E8E93",
                                fontSize: 9,
                            }
                        }],
                        yAxes: [{
                            stacked: true,
                            gridLines: {
                                display: true,
                                drawBorder: false,

                            },
                            ticks: {
                                fontColor:"#8E8E93",
                                fontSize: 10,
                                stepSize: 2000,
                                backdropPaddingY: 13,
                                padding: 3,

                            }
                        },
                            // {
                            //     id: "line_",
                            //     ticks: {
                            //         display: false
                            //     }
                            //
                            ],
                        display: false,
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        cornerRadius: 11
                    }
                }
            });

        }
    }, [])
    return (
        <div className={styles.wrapper}>
            {/*<Bar data={data} options={options} legend={""} />*/}
            <canvas id="myChart" width="320" height="210" />
        </div>
    )
}