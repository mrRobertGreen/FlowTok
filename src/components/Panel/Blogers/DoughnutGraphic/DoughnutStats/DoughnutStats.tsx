import React, {FC} from "react"
import styles from "./styles.module.scss";
import greenMan from "../../../../../media/icons/greenMan.svg";
import yellowMan from "../../../../../media/icons/yellowMan.svg";
import redMan from "../../../../../media/icons/redMan.svg";

// статистика рядом с графиком-пончиком

export const DoughnutStats: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container_main}>
                <img src={greenMan} className={styles.img} alt=""/>
                <div className={styles.status}>
                    <p className={styles.status__text}>Выполнили</p>
                    <p className={styles.numbers}>927</p>
                </div>
            </div>

            <div className={styles.container}>
                <img src={yellowMan} className={styles.img} alt=""/>
                <div className={styles.status}>
                    <p className={styles.status__text}>В процессе</p>
                    <p className={styles.numbers}>163</p>
                </div>
            </div>

            <div className={styles.container}>
                <img src={redMan} className={styles.img} alt=""/>
                <div className={styles.status}>
                    <p className={styles.status__text}>Отменили</p>
                    <p className={styles.numbers}>18</p>
                </div>
            </div>
        </div>
    )
}