import React, {FC} from "react";
import styles from "./styles.module.scss"
import Button from "../../../Button/Button";
import {NavLink} from "react-router-dom";
import {Card} from "../../../Card/Card";
import clock from "../../../../media/images_new/clock.svg";

export type PropsType = {
    valueUp: number
    valueDown: number
}

const Balance: FC<PropsType> = ({valueUp, valueDown}) => {

    return (
        <div data-test={"wrapper"} className={styles.wrapper}>
            <div>
                <div className={styles.title}>
                    Кошелек
                    <button className={styles.clock}>
                        <img src={clock} alt=""/>
                    </button>
                </div>
                <div className={styles.label}>
                    Ваш баланс
                </div>
                <div className={styles.money}>
                    {valueUp}.{valueDown}₽
                </div>
            </div>

            <div className={styles.btn} data-test={"btn"}>
                <div className={styles.btn__first}>
                    <NavLink to={"/withdraw"}>
                        <Button data-test={"btn"} mod={"green"}>Пополнить</Button>
                    </NavLink>
                </div>
                <div className={styles.btn__second}>
                    <NavLink to={"/withdraw"}>
                        <Button data-test={"button"} mod={"gradient"}>Выплатить</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Balance