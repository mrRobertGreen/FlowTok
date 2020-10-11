import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import info from "../../media/images_new/Info.svg";
import {Card} from "../Card/Card";
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {getAllTimeMoney, getEverySecMoney, getRealTimeProfit, getSecondsToday, round} from "../../utils/realTimeData";
import {transfer} from "../../redux/user/user-reducer";

type PropsType = {

}

export const OffShore: FC<PropsType> = () => {

    const bank = useSelector((state: RootStateType) => state.user.bank)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const omTransfer = () => {
        dispatch(transfer(setIsLoading))
    }

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
                    <p className={styles.money}>{bank}₽</p>
                </div>
                <Button mod={isLoading ? "loading" : "gradient"} onClick={omTransfer}>
                    В кошелек
                </Button>
            </div>
        </div>
    )
}

