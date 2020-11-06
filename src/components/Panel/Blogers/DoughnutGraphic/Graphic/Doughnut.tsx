import React, {FC} from "react"
import styles from "./styles.module.scss";
import {Doughnut} from "@reactchartjs/react-chart.js";

// График-пончик

export const DoughnutGraphic: FC = () => {

    // в пропсы ты должен получить три числа для диаграммы, сделать массив (или получить их в массиве)
    // и вставить этот массив в data, как указано в примере
    // так же вычисляй сумму и клади ее в переменную:
    let Sum = 1098; //  в дизайне 1098, но это, видимо, у дизайнера проблемы с математикой, насчет того, что это сумма догодался я сам

    let data = {
        datasets: [
            {
                data: [163, 18, 927], // сюда, числа для пончика, 1 - В процессе, 2 - отменили, 3 - выполнили
                backgroundColor: [
                    '#FFEC16',
                    '#F21E1E',
                    '#0DC646'
                ],
                borderWidth: 0
            }
        ]
    }
    let options = {
        cutoutPercentage: 75
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.stat}>
                <p className={styles.stat__sum}>{ Sum }</p>
                <p className={styles.stat__all}>Всего</p>
            </div>
            <Doughnut type={'doughnut'} data={data} width={190} options={options} height={190} />
            {/*есть пропс redraw, на случай если нужны будут данные онлайн
               доки: https://github.com/reactchartjs/react-chartjs-2*/}
        </div>
    )
}