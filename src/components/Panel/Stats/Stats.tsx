import React, {useState} from "react"
import styles from "./styles.module.scss"
import {StatsGraphic} from "./StatsGraphic/StatsGraphic";
import {StatisticFooter} from "./StatisticFooter/StatisticFooter";
import arrow from "../../../media/icons/arrow_down.svg";
import {TimeChangeMenu} from "../TimeChangeMenu/TimeChangeMenu";

export const Stats = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const hideMenu = () => {
        if (isMenuVisible) setMenuVisible(false)
        else setMenuVisible(true)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.header__title}>Статистика</p>
                    <div className={styles.header__date}>
                        <span className={styles.period}>Период:</span>
                        <button className={styles.time_button} onClick={hideMenu}>
                            <span className={styles.time}>Неделя</span>
                            <TimeChangeMenu isOpen={isMenuVisible} />
                        </button>
                    </div>
                </div>
                <div className={styles.graphic}>
                    <StatsGraphic />
                </div>
                <div className={styles.footer}>
                    <StatisticFooter/>
                </div>
            </div>
        </div>
    )
}