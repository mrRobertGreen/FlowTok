import React from "react"
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import arrowLeft from "../../../media/icons/ad_arrow_left.svg";
import arrowRight from "../../../media/icons/ad_arrow_right.svg";
import {DoughnutGraphic} from "./DoughnutGraphic/Graphic/Doughnut";
import {DoughnutStats} from "./DoughnutGraphic/DoughnutStats/DoughnutStats";

export const Blogers = () => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop);

    let timeText = ["День", "Неделя", "Месяц"]

    const onRightChangeButtons = () => {
        let [first, second, third] = timeText;
        timeText[0] = third;
        timeText[1] = first;
        timeText[2] = second;
    }
    const onLeftChangeButtons = () => {
        let [first, second, third] = timeText;
        timeText[0] = second;
        timeText[1] = third;
        timeText[2] = first;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header_container}>
                    <p className={styles.title}>Блогеры</p>
                    {isDesktop ?
                        <span/> :
                        <div className={styles.time}>
                            <button className={styles.move_button} onClick={onLeftChangeButtons}>
                                <img src={arrowLeft} alt=""/>
                            </button>
                            <div className={styles.time__container}>
                                <p className={styles.opacity_time}>{timeText[0]}</p>
                                <p className={styles.open_time}>{timeText[1]}</p>
                                <p className={styles.opacity_time}>{timeText[2]}</p>
                            </div>
                            <button className={styles.move_button} onClick={onRightChangeButtons}>
                                <img src={arrowRight} alt=""/>
                            </button>
                        </div>}
                </div>
                <div className={styles.graphic}>
                    <DoughnutGraphic />
                    <DoughnutStats />
                </div>
            </div>
        </div>
    )
}