import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";
import {
   DAY_SECONDS, getAllTimeMoney,
   getEverySecMoney,
   getRealTimeProfit,
   getSecondsToday,
   round
} from "../../../../utils/realTimeProfit";
import {getUserData, userActions} from "../../../../redux/user/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";

export type PropsType = {
   allTimeMoney: UserMoneyT
   restDayMoney: {
      small: number
      large: number
      refrigerator: number
   }
}

export const AllProfit: FC<PropsType> = ({allTimeMoney, restDayMoney}) => {

   const dispatch = useDispatch()
   const bank = useSelector((state: RootStateType) => state.user.bank)

   const restDayMoneyAll = restDayMoney.large + restDayMoney.small + restDayMoney.refrigerator

   // получает каждую секунду
   const everySecMoneySmall = getEverySecMoney(restDayMoney.small)
   const everySecMoneyLarge = getEverySecMoney(restDayMoney.large)
   const everySecMoneyRefrigerator = getEverySecMoney(restDayMoney.refrigerator)
   const everySecMoneyAll = getEverySecMoney(restDayMoney.refrigerator + restDayMoney.small + restDayMoney.large)

   // уже получил за сегодня
   const [realTimeProfitSmall, setRealTimeProfitSmall] = useState(getRealTimeProfit(+everySecMoneySmall))
   const [realTimeProfitLarge, setRealTimeProfitLarge] = useState(getRealTimeProfit(+everySecMoneyLarge))
   const [realTimeProfitRefrigerator, setRealTimeProfitRefrigerator] = useState(getRealTimeProfit(+everySecMoneyRefrigerator))
   const [realTimeProfitAll, setRealTimeProfitAll] = useState(getRealTimeProfit(+everySecMoneyAll))

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
            <p className={styles.profit}>{realTimeProfitAll}₽</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.column}>
               <p className={styles.size}>Small</p>
               <p className={styles.money_2}>{getAllTimeMoney(restDayMoney.small, realTimeProfitSmall, allTimeMoney.small)}₽</p>
               <p className={styles.profit}>+{realTimeProfitSmall}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Large</p>
               <p className={styles.money_2}>{getAllTimeMoney(restDayMoney.large, realTimeProfitLarge, allTimeMoney.large)}₽</p>
               <p className={styles.profit}>+{realTimeProfitLarge}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Холодильник</p>
               <p className={styles.money_2}>
                  {getAllTimeMoney(restDayMoney.refrigerator, realTimeProfitRefrigerator, allTimeMoney.refrigerator)}₽
               </p>
               <p className={styles.profit}>+{realTimeProfitRefrigerator}₽</p>
            </div>
         </div>
      </div>
   )
}