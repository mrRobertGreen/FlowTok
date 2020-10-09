import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import info from "../../media/images_new/Info.svg";
import {Card} from "../Card/Card";
import Button from "../Button/Button";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {getSecondsToday} from "../../utils/getRealTimeProfit";

type PropsType = {
    bank?: number
}

export const OffShore: FC<PropsType> = ({bank}) => {

    const everySecAllMoney = useSelector((state: RootStateType) => state.user.everySecAllMoney)
    const [realTimeBank, setRealTimeBank] = useState(""+bank)

    useEffect(() => {
        if (realTimeBank) {
            const interval = setInterval(() => {

                setRealTimeBank((+realTimeBank + everySecAllMoney).toFixed(3))

            }, 1000);
            return () => clearInterval(interval);
        }
    }, [realTimeBank, everySecAllMoney]);

    if (!bank) return <></>

    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.title}>
                    <p>Оффшорный счет</p>
                    <button style={{backgroundColor:"white"}}>
                        <img src={info} className={styles.title__info} alt=""/>
                    </button>
                </div>
                <div className={styles.label}>
                    Ваш баланс
                </div>
                <div className={styles.sum}>
                    <p className={styles.money}>{realTimeBank}</p>
                </div>
                <Button mod={"gradient"}>
                    В кошелек
                </Button>
            </div>
        </div>
    )
}

