import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";
import {DAY_SECONDS, getSecondsToday} from "../../../../utils/getRealTimeProfit";
import {getUserData, userActions} from "../../../../redux/user/user-reducer";
import {useDispatch} from "react-redux";

export type PropsType = {
   allTimeMoney: UserMoneyT
   allDaySum: {
      small: number
      large: number
      refrigerator: number
   }
}

export const AllProfit: FC<PropsType> = ({allTimeMoney, allDaySum}) => {

   const everySecSumSmall = allDaySum.small / DAY_SECONDS // столько он получает каждую секунду
   const everySecSumLarge = allDaySum.large / DAY_SECONDS
   const everySecSumRefrigerator = allDaySum.refrigerator / DAY_SECONDS
   const everySecSumAll = everySecSumSmall + everySecSumLarge + everySecSumRefrigerator

   const dispatch = useDispatch()
   dispatch(userActions.setEverySecAllMoney(everySecSumAll))

   const [realTimeProfitSmall, setRealTimeProfitSmall] = useState((everySecSumSmall * getSecondsToday()).toFixed(3))
   const [realTimeProfitLarge, setRealTimeProfitLarge] = useState((everySecSumLarge * getSecondsToday()).toFixed(3))
   const [realTimeProfitRefrigerator, setRealTimeProfitRefrigerator] = useState((everySecSumRefrigerator * getSecondsToday()).toFixed(3))
   const [realTimeProfitAll, setRealTimeProfitAll] = useState((everySecSumAll * getSecondsToday()).toFixed(3))


   useEffect(() => {
      setInterval(() => {
         if (getSecondsToday() === 0) dispatch(getUserData())
      }, 1000)
   }, [])

   useEffect(() => {
      const interval = setInterval(() => {
         setRealTimeProfitSmall((+realTimeProfitSmall + everySecSumSmall).toFixed(3))
      }, 1000);
      return () => clearInterval(interval);
   }, [realTimeProfitSmall]);

   useEffect(() => {
      const interval = setInterval(() => {
         setRealTimeProfitLarge((+realTimeProfitLarge + everySecSumLarge).toFixed(3))
      }, 1000);
      return () => clearInterval(interval);
   }, [realTimeProfitLarge]);

   useEffect(() => {
      const interval = setInterval(() => {
         setRealTimeProfitRefrigerator((+realTimeProfitRefrigerator + everySecSumRefrigerator).toFixed(3))
      }, 1000);
      return () => clearInterval(interval);
   }, [realTimeProfitRefrigerator]);

   useEffect(() => {
      const interval = setInterval(() => {
         setRealTimeProfitAll((+realTimeProfitAll + everySecSumAll).toFixed(3))
      }, 1000);
      return () => clearInterval(interval);
   }, [realTimeProfitAll]);


   const {all, large, refrigerator, small} = allTimeMoney

   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         <div className={styles.label}>
            Получено за все время
         </div>
         <div className={styles.money}>
            {(all + +realTimeProfitAll).toFixed(3)}₽
            <p className={styles.profit}>+{realTimeProfitAll}₽</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.column}>
               <p className={styles.size}>Small</p>
               <p className={styles.money_2}>{(small + +realTimeProfitSmall).toFixed(3)}₽</p>
               <p className={styles.profit}>+{realTimeProfitSmall}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Large</p>
               <p className={styles.money_2}>{(large + +realTimeProfitLarge).toFixed(3)}₽</p>
               <p className={styles.profit}>+{realTimeProfitLarge}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Холодильник</p>
               <p className={styles.money_2}>{(refrigerator + +realTimeProfitRefrigerator).toFixed(3)}₽</p>
               <p className={styles.profit}>+{realTimeProfitRefrigerator}₽</p>
            </div>
         </div>
      </div>
   )
}