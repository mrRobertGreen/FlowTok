import React from "react";
import styles from "./styles.module.scss";
import Slider from "../../../Cabinet_mPage/CreateTaskForm/Slider/Slider";
import {ToggleSwitch} from "../../../Input/Input";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";

export const CampaignsCard = () => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop);
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.header__title}>
                        <p>FlowTok</p>
                        <div className={styles.switch}>
                            <ToggleSwitch isLabel={false}/>
                            {isDesktop ?
                                <div className={styles.tooltip}>
                                    <p className={styles.tooltip__title}>Статус рекламной компании</p>
                                    <p className={styles.tooltip__text}>Вы можете приостановить или возобновить выполнение задания, а также списание средств.</p>
                                </div>
                                : <span></span>}
                        </div>
                    </div>
                    <p className={styles.greyText}>11.09.2020 - 27.09.2020</p>
                </div>
                <div className={styles.stat}>
                    <div className={styles.stat__container}>
                        <p className={styles.greyText}>Просмотры</p>
                        <p className={styles.stat__numbers}>12359</p>
                        <p className={styles.stat__rice}>+1318 за сутки</p>
                    </div>
                    <div className={styles.stat__container}>
                        <p className={styles.greyText}>Лайки</p>
                        <p className={styles.stat__numbers}>6234</p>
                        <p className={styles.stat__rice}>+1318 за сутки</p>
                    </div>
                    <div className={styles.stat__container}>
                        <p className={styles.greyText}>Бюджет</p>
                        <p className={styles.stat__numbers}>3550 ₽</p>
                        <p className={`${styles.stat__rice} ${styles.red_rice}`}>+1318 за сутки</p>
                    </div>
                </div>
            </div>
        </div>
    )
}