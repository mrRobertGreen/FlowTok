import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";
import {
   DAY_SECONDS, getAllTimeMoney,
   getEverySecMoney,
   getRealTimeProfit,
   getSecondsToday,
   round
} from "../../../../utils/realTimeData";
import {getUserData, userActions} from "../../../../redux/user/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";

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

export const AllProfit: FC<PropsType> = ({allTimeMoney, allDayMoney}) => {

   const dispatch = useDispatch()
   const bank = useSelector((state: RootStateType) => state.user.bank)

   const restDayMoneyAll = allDayMoney.still.large + allDayMoney.still.small + allDayMoney.still.refrigerator

   // получает каждую секунду
   const everySecMoneySmall = getEverySecMoney(allDayMoney.still.small)
   const everySecMoneyLarge = getEverySecMoney(allDayMoney.still.large)
   const everySecMoneyRefrigerator = getEverySecMoney(allDayMoney.still.refrigerator)
   const everySecMoneyAll = getEverySecMoney(allDayMoney.still.refrigerator + allDayMoney.still.small + allDayMoney.still.large)

   // уже получил за сегодня
   const [realTimeProfitSmall, setRealTimeProfitSmall] = useState(round(allDayMoney.now.small, 3))
   const [realTimeProfitLarge, setRealTimeProfitLarge] = useState(round(allDayMoney.now.large, 3))
   const [realTimeProfitRefrigerator, setRealTimeProfitRefrigerator] = useState(round(allDayMoney.now.refrigerator, 3))
   const [realTimeProfitAll, setRealTimeProfitAll] = useState(round(allDayMoney.now.small + allDayMoney.now.large + allDayMoney.now.refrigerator, 3))

   // увеличение каждую секунду
   useEffect(() => {
      const interval = setInterval(() => {
         console.log("everySecMoneySmall: " + everySecMoneySmall)
         console.log("realTimeProfitSmall: " + realTimeProfitSmall)

         console.log("everySecMoneyLarge: " + everySecMoneyLarge)
         console.log("realTimeProfitLarge: " + realTimeProfitLarge)

         console.log("everySecMoneyRefrigerator: " + everySecMoneyRefrigerator)
         console.log("realTimeProfitRefrigerator: " + realTimeProfitRefrigerator)

         console.log("everySecMoneyAll: " + everySecMoneyAll)
         console.log("realTimeProfitAll: " + realTimeProfitAll)

         console.log("bank: " + bank)
         console.log("\n")

         setRealTimeProfitSmall(getRealTimeProfit(+everySecMoneySmall))
         setRealTimeProfitLarge(getRealTimeProfit(+everySecMoneyLarge))
         setRealTimeProfitRefrigerator(getRealTimeProfit(+everySecMoneyRefrigerator))
         setRealTimeProfitAll(getRealTimeProfit(+everySecMoneyAll))

         // увеличиваю оффшор
         dispatch(userActions.setBank(round(bank + everySecMoneyAll, 3)))
      }, 1000);
      return () => clearInterval(interval);
   }, [realTimeProfitSmall, realTimeProfitRefrigerator, realTimeProfitLarge, realTimeProfitAll, bank]);

   // обновление в 00:00
   useEffect(() => {
      const interval = setInterval(() => {
         if (getSecondsToday() === 0) dispatch(getUserData())
      }, 1000);
      return () => clearInterval(interval);
   }, [])


   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         <div className={styles.label}>
            Получено за все время
         </div>
         <div className={styles.money}>
            {getAllTimeMoney(restDayMoneyAll, realTimeProfitAll, allTimeMoney.all)}₽
            <p className={styles.profit}>+{realTimeProfitAll}₽</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.column}>
               <p className={styles.size}>Small</p>
               <p className={styles.money_2}>{getAllTimeMoney(allDayMoney.still.small, realTimeProfitSmall, allTimeMoney.small)}₽</p>
               <p className={styles.profit}>+{realTimeProfitSmall}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Large</p>
               <p className={styles.money_2}>{getAllTimeMoney(allDayMoney.still.large, realTimeProfitLarge, allTimeMoney.large)}₽</p>
               <p className={styles.profit}>+{realTimeProfitLarge}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Холодильник</p>
               <p className={styles.money_2}>
                  {getAllTimeMoney(allDayMoney.still.refrigerator, realTimeProfitRefrigerator, allTimeMoney.refrigerator)}₽
               </p>
               <p className={styles.profit}>+{realTimeProfitRefrigerator}₽</p>
            </div>
         </div>
      </div>
   )
}