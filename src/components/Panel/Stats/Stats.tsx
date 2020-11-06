import React from "react"
import styles from "./styles.module.scss"
import {StatsGraphic} from "./StatsGraphic/StatsGraphic";

export const Stats = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.header__title}>Статистика</p>
                    <div>
                        Период неделя
                    </div>
                </div>
                <div className={styles.graphic}>
                    <StatsGraphic />
                </div>
            </div>
        </div>
    )
}