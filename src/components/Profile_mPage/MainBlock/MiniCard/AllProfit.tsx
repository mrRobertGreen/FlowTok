import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";
import {DAY_SECONDS, getRealTimeProfit, getSecondsToday} from "../../../../utils/getRealTimeProfit";
import {getUserData} from "../../../../redux/user/user-reducer";
import {useDispatch} from "react-redux";

export type PropsType = {
   allTimeMoney: UserMoneyT
   allDaySum: {
      small: number
      large: number
      refrigerator: number
      all: number
   }
}

export const AllProfit: FC<PropsType> = ({allTimeMoney, allDaySum}) => {

   const everySecSumAll = allDaySum.all / DAY_SECONDS
   const everySecSumSmall = allDaySum.small / DAY_SECONDS
   const everySecSumLarge = allDaySum.large / DAY_SECONDS
   const everySecSumRefrigerator = allDaySum.refrigerator / DAY_SECONDS
   const dispatch = useDispatch()

   const [realTimeProfitAll, setRealTimeProfitAll] = useState(getRealTimeProfit(allDaySum.all, everySecSumAll))
   const [realTimeProfitSmall, setRealTimeProfitSmall] = useState(getRealTimeProfit(allDaySum.small, everySecSumSmall))
   const [realTimeProfitLarge, setRealTimeProfitLarge] = useState(getRealTimeProfit(allDaySum.large, everySecSumLarge))
   const [realTimeProfitRefrigerator, setRealTimeProfitRefrigerator] = useState(getRealTimeProfit(allDaySum.refrigerator, everySecSumRefrigerator))


   useEffect(() => {
      setInterval(() => {
         if (getSecondsToday() === 0) dispatch(getUserData())
      }, 1000)
   }, [])


   setInterval(() => {
      setRealTimeProfitAll(getRealTimeProfit(allDaySum.all, everySecSumAll))
      setRealTimeProfitLarge(getRealTimeProfit(allDaySum.large, everySecSumLarge))
      setRealTimeProfitSmall(getRealTimeProfit(allDaySum.small, everySecSumSmall))
      setRealTimeProfitRefrigerator(getRealTimeProfit(allDaySum.refrigerator, everySecSumRefrigerator))

   }, 1000)

   const {all, large, refrigerator, small} = allTimeMoney

   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         <div className={styles.label}>
            Получено за все время
         </div>
         <div className={styles.money}>
            {all}₽
            <p className={styles.profit}>+{realTimeProfitAll}₽</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.column}>
               <p className={styles.size}>Small</p>
               <p className={styles.money_2}>{small}₽</p>
               <p className={styles.profit}>+{realTimeProfitSmall}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Large</p>
               <p className={styles.money_2}>{large}₽</p>
               <p className={styles.profit}>+{realTimeProfitLarge}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Холодильник</p>
               <p className={styles.money_2}>{refrigerator}₽</p>
               <p className={styles.profit}>+{realTimeProfitRefrigerator}₽</p>
            </div>
         </div>
      </div>
   )
}