import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";
import {getEverySecMoney, getSecondsToday, round} from "../../../../utils/realTimeData";
import {getUserData, RealMoneyDataT, userActions} from "../../../../redux/user/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import Preloader from "../../../common/Preloader/Preloader";

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

   // увеличение каждую секунду
   useEffect(() => {
      const interval = setInterval(() => {
         if (data) {
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
                  large:  round(data.realAllTimeMoney.large + data.everySecMoney.large, 2),
                  refrigerator:  round(data.realAllTimeMoney.refrigerator + data.everySecMoney.refrigerator, 2),
                  small:  round(data.realAllTimeMoney.small + data.everySecMoney.small, 2),
               },
               realDayMoney: {
                  all:  round(data.realDayMoney.all + data.everySecMoney.all, 3),
                  large:  round(data.realDayMoney.large + data.everySecMoney.large, 3),
                  refrigerator:  round(data.realDayMoney.refrigerator + data.everySecMoney.refrigerator, 3),
                  small:  round(data.realDayMoney.small + data.everySecMoney.small, 3),
               }
            }

            dispatch(userActions.setRealMoneyData(realTimeData))

            // увеличиваю оффшор
            // dispatch(userActions.setBank(round(bank + data.everySecMoney.all, 3)))
         }

      }, 1000);
      return () => clearInterval(interval);
   }, [data]);

   // обновление в 00:00
   useEffect(() => {
      const interval = setInterval(() => {
         if (getSecondsToday() === 0) dispatch(getUserData())
      }, 1000);
      return () => clearInterval(interval);
   }, [])

   if (!data) return <Preloader/>

   const {realDayMoney, realAllTimeMoney} = data

   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         <div className={styles.label}>
            Получено за все время
         </div>
         <div className={styles.money}>
            {realAllTimeMoney.all}₽
            <p className={styles.profit}>+{realDayMoney.all}₽</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.column}>
               <p className={styles.size}>Small</p>
               <p className={styles.money_2}>{realAllTimeMoney.small}₽</p>
               <p className={styles.profit}>+{realDayMoney.small}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Large</p>
               <p className={styles.money_2}>{realAllTimeMoney.large}₽</p>
               <p className={styles.profit}>+{realDayMoney.large}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Холодильник</p>
               <p className={styles.money_2}>
                  {realAllTimeMoney.refrigerator}₽
               </p>
               <p className={styles.profit}>+{realDayMoney.refrigerator}₽</p>
            </div>
         </div>
      </div>
   )
}