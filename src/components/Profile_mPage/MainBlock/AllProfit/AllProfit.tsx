import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";
import {getEverySecMoney, getSecondsToday, round} from "../../../../utils/realTimeData";
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
            dispatch(userActions.setBank(round(bank + data.everySecMoney.all, 2)))
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
                  all: round(data.realAllTimeMoney.all + data.everySecMoney.all, 2),
                  large: round(data.realAllTimeMoney.large + data.everySecMoney.large, 2),
                  refrigerator: round(data.realAllTimeMoney.refrigerator + data.everySecMoney.refrigerator, 2),
                  small: round(data.realAllTimeMoney.small + data.everySecMoney.small, 2),
               },
               realDayMoney: {
                  all: round(data.realDayMoney.all + data.everySecMoney.all, 3),
                  large: round(data.realDayMoney.large + data.everySecMoney.large, 3),
                  refrigerator: round(data.realDayMoney.refrigerator + data.everySecMoney.refrigerator, 3),
                  small: round(data.realDayMoney.small + data.everySecMoney.small, 3),
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
         <div className={styles.label}>
            {t("allProfit-label")}
         </div>
         <div className={styles.money}>
            {realAllTimeMoney.all}{cy === "RUB" ? "₽" : "$"}
            <p className={styles.profit}>+{realDayMoney.all}{cy === "RUB" ? "₽" : "$"}</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.column}>
               <p className={styles.size}>Small</p>
               <p className={styles.money_2}>{realAllTimeMoney.small}{cy === "RUB" ? "₽" : "$"}</p>
               <p className={styles.profit}>+{realDayMoney.small}{cy === "RUB" ? "₽" : "$"}</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Large</p>
               <p className={styles.money_2}>{realAllTimeMoney.large}{cy === "RUB" ? "₽" : "$"}</p>
               <p className={styles.profit}>+{realDayMoney.large}{cy === "RUB" ? "₽" : "$"}</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Refrigerator</p>
               <p className={styles.money_2}>
                  {realAllTimeMoney.refrigerator}{cy === "RUB" ? "₽" : "$"}
               </p>
               <p className={styles.profit}>+{realDayMoney.refrigerator}{cy === "RUB" ? "₽" : "$"}</p>
            </div>
         </div>
      </div>
   )
}