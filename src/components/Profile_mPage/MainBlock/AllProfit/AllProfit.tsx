import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";
import {getEverySecMoney, getSecondsToday, round, smartRound} from "../../../../utils/realTimeData";
import {getUserData, RealMoneyDataT, userActions} from "../../../../redux/user/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import Preloader from "../../../common/Preloader/Preloader";
import {useTranslation} from "react-i18next";

export type PropsType = {
    allTimeMoney: UserMoneyT
    allDayMoney: {
        now: {
            small: number
            large: number
            refrigerator: number
        }
        still: {
            small: number
            large: number
            refrigerator: number
        }
    }
}

export const AllProfit: FC<PropsType> = ({}) => {

    const dispatch = useDispatch()
    const bank = useSelector((state: RootStateType) => state.user.bank)
    const data = useSelector((state: RootStateType) => state.user.realMoneyData)
    const cy = useSelector((state: RootStateType) => state.app.cy)

    const {t} = useTranslation()

    // увеличение каждую секунду
    useEffect(() => {
        const interval = setInterval(() => {
            if (data && bank) {
                console.log("bank: " + bank)
                console.log("\n")

                // увеличиваю оффшор
                dispatch(userActions.setBank(bank + data.everySecMoney.all))
            }


        }, 1000);
        return () => clearInterval(interval);
    }, [bank]);


    // увеличение каждую секунду
    useEffect(() => {
        const interval = setInterval(() => {
            if (data) {
                console.log("everySecMoneySmall: " + data.everySecMoney.small)
                console.log("realDayMoneySmall: " + data.realDayMoney.small)

                console.log("everySecMoneyLarge: " + data.everySecMoney.large)
                console.log("realDayMoneyLarge: " + data.realDayMoney.large)

                console.log("everySecMoneyRefrigerator: " + data.everySecMoney.refrigerator)
                console.log("realDayMoneyRefrigerator: " + data.realDayMoney.refrigerator)

                console.log("everySecMoneyAll: " + data.everySecMoney.all)
                console.log("realDayMoneyAll: " + data.realDayMoney.all)
                console.log("\n")

                const realTimeData: RealMoneyDataT = {
                    everySecMoney: {...data.everySecMoney},
                    realAllTimeMoney: {
                        all: data.realAllTimeMoney.all + data.everySecMoney.all,
                        large: data.realAllTimeMoney.large + data.everySecMoney.large,
                        refrigerator: data.realAllTimeMoney.refrigerator + data.everySecMoney.refrigerator,
                        small: data.realAllTimeMoney.small + data.everySecMoney.small,
                    },
                    realDayMoney: {
                        all: data.realDayMoney.all + data.everySecMoney.all,
                        large: data.realDayMoney.large + data.everySecMoney.large,
                        refrigerator: data.realDayMoney.refrigerator + data.everySecMoney.refrigerator,
                        small: data.realDayMoney.small + data.everySecMoney.small,
                    }
                }

                dispatch(userActions.setRealMoneyData(realTimeData))

                if (getSecondsToday() === 0) dispatch(getUserData())  // обновление в 00:00
            }

        }, 1000);
        return () => clearInterval(interval);
    }, [data]);

    if (!data) return <Preloader/>

    const {realDayMoney, realAllTimeMoney} = data

    return (
        <div data-test={"wrapper"} className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.label}>
                    {t("allProfit-label")}
                </div>
                <div className={styles.money}>
                    {round(realAllTimeMoney.all, 10)}{cy === "RUB" ? "₽" : "$"}
                    <p className={styles.profit}>+{round(realDayMoney.all, 10)}{cy === "RUB" ? "₽" : "$"}</p>
                </div>
                <div className={styles.footer}>
                    <div className={styles.column}>
                        <p className={styles.size}>Small</p>
                        <p className={styles.money_2}>{smartRound(realAllTimeMoney.small)}{cy === "RUB" ? "₽" : "$"}</p>
                        <p className={styles.profit}>+{smartRound(realDayMoney.small)}{cy === "RUB" ? "₽" : "$"}</p>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.size}>Large</p>
                        <p className={styles.money_2}>{smartRound(realAllTimeMoney.large)}{cy === "RUB" ? "₽" : "$"}</p>
                        <p className={styles.profit}>+{smartRound(realDayMoney.large)}{cy === "RUB" ? "₽" : "$"}</p>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.size}>Refrigerator</p>
                        <p className={styles.money_2}>
                            {smartRound(realAllTimeMoney.refrigerator)}{cy === "RUB" ? "₽" : "$"}
                        </p>
                        <p className={styles.profit}>+{smartRound(realDayMoney.refrigerator)}{cy === "RUB" ? "₽" : "$"}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}