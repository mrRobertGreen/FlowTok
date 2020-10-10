import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";
import {DAY_SECONDS, getSecondsToday} from "../../../../utils/getRealTimeProfit";
import {getUserData, userActions} from "../../../../redux/user/user-reducer";
import {useDispatch} from "react-redux";

export type PropsType = {
   allTimeMoney: UserMoneyT
   allDayMoney: {
      small: number
      large: number
      refrigerator: number
   }
}

export const AllProfit: FC<PropsType> = ({allTimeMoney, allDayMoney}) => {

   const dispatch = useDispatch()

   // получает каждую секунду
   const everySecSumSmall = allDayMoney.small / (DAY_SECONDS - getSecondsToday())
   const everySecSumLarge = allDayMoney.large / (DAY_SECONDS - getSecondsToday())
   const everySecSumRefrigerator = allDayMoney.refrigerator / (DAY_SECONDS - getSecondsToday())
   const everySecSumAll = everySecSumSmall + everySecSumLarge + everySecSumRefrigerator

   dispatch(userActions.setEverySecAllMoney(everySecSumAll))

   // уже получил за сегодня
   const [realTimeProfitSmall, setRealTimeProfitSmall] = useState((everySecSumSmall * getSecondsToday()).toFixed(3))
   const [realTimeProfitLarge, setRealTimeProfitLarge] = useState((everySecSumLarge * getSecondsToday()).toFixed(3))
   const [realTimeProfitRefrigerator, setRealTimeProfitRefrigerator] = useState((everySecSumRefrigerator * getSecondsToday()).toFixed(3))
   const [realTimeProfitAll, setRealTimeProfitAll] = useState((everySecSumAll * getSecondsToday()).toFixed(3))

   // увеличение каждую секунду
   useEffect(() => {
      const interval = setInterval(() => {
         console.log("small: " + everySecSumSmall)
         setRealTimeProfitSmall((+realTimeProfitSmall + everySecSumSmall).toFixed(3))
         console.log("large: " + everySecSumLarge)
         setRealTimeProfitLarge((+realTimeProfitLarge + everySecSumLarge).toFixed(3))
         console.log("refrigerator: " + everySecSumRefrigerator)
         setRealTimeProfitRefrigerator((+realTimeProfitRefrigerator + everySecSumRefrigerator).toFixed(3))
         console.log("all: " + everySecSumAll)
         setRealTimeProfitAll((+realTimeProfitAll + everySecSumAll).toFixed(3))
      }, 1000);
      return () => clearInterval(interval);
   }, [realTimeProfitSmall, realTimeProfitRefrigerator, realTimeProfitLarge]);

   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       console.log("large: " + everySecSumLarge)
   //       setRealTimeProfitLarge((+realTimeProfitLarge + everySecSumLarge).toFixed(3))
   //    }, 1000);
   //    return () => clearInterval(interval);
   // }, [realTimeProfitLarge]);
   //
   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       console.log("refrigerator: " + everySecSumRefrigerator)
   //       setRealTimeProfitRefrigerator((+realTimeProfitRefrigerator + everySecSumRefrigerator).toFixed(3))
   //    }, 1000);
   //    return () => clearInterval(interval);
   // }, [realTimeProfitRefrigerator]);
   //
   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       console.log("all: " + everySecSumAll)
   //       setRealTimeProfitAll((+realTimeProfitAll + everySecSumAll).toFixed(3))
   //    }, 1000);
   //    return () => clearInterval(interval);
   // }, [realTimeProfitAll]);

   // обновление в 00:00
   useEffect(() => {
      const interval = setInterval(() => {
         if (getSecondsToday() === 0) dispatch(getUserData())
      }, 1000);
      return () => clearInterval(interval);
   }, [])

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