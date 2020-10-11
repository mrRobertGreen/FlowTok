import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";
import {getEverySecMoney, getSecondsToday, round} from "../../../../utils/realTimeData";
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

   // const nowDayMoneyAll = allDayMoney.now.large + allDayMoney.now.small + allDayMoney.now.refrigerator

   // получает каждую секунду
   const everySecMoneySmall = getEverySecMoney(allDayMoney.still.small)
   const everySecMoneyLarge = getEverySecMoney(allDayMoney.still.large)
   const everySecMoneyRefrigerator = getEverySecMoney(allDayMoney.still.refrigerator)
   const everySecMoneyAll = getEverySecMoney(allDayMoney.still.refrigerator + allDayMoney.still.small + allDayMoney.still.large)

   // получил за сегодня
   const [realProfitSmall, setRealProfitSmall] = useState(round(allDayMoney.now.small, 3))
   const [realProfitLarge, setRealProfitLarge] = useState(round(allDayMoney.now.large, 3))
   const [realProfitRefrigerator, setRealProfitRefrigerator] = useState(round(allDayMoney.now.refrigerator, 3))
   const [realProfitAll, setRealProfitAll] = useState(round(allDayMoney.now.small + allDayMoney.now.large + allDayMoney.now.refrigerator, 3))

   // получил за все время
   const [realAllTimeSmall, setRealAllTimeSmall] = useState(round(allTimeMoney.small, 3))
   const [realAllTimeLarge, setRealAllTimeLarge] = useState(round(allTimeMoney.large, 3))
   const [realAllTimeRefrigerator, setRealAllTimeRefrigerator] = useState(round(allTimeMoney.refrigerator, 3))
   const [realAllTimeAll, setRealAllTimeAll] = useState(round(allTimeMoney.all, 3))

   // увеличение каждую секунду
   useEffect(() => {
      const interval = setInterval(() => {
         console.log("everySecMoneySmall: " + everySecMoneySmall)
         console.log("realProfitSmall: " + realProfitSmall)

         console.log("everySecMoneyLarge: " + everySecMoneyLarge)
         console.log("realProfitLarge: " + realProfitLarge)

         console.log("everySecMoneyRefrigerator: " + everySecMoneyRefrigerator)
         console.log("realProfitRefrigerator: " + realProfitRefrigerator)

         console.log("everySecMoneyAll: " + everySecMoneyAll)
         console.log("realProfitAll: " + realProfitAll)

         console.log("bank: " + bank)
         console.log("\n")

         setRealProfitSmall(round(realProfitSmall + everySecMoneySmall, 3))
         setRealProfitLarge(round(realProfitLarge + everySecMoneyLarge, 3))
         setRealProfitRefrigerator(round(realProfitRefrigerator + everySecMoneyRefrigerator, 3))
         setRealProfitAll(round(realProfitAll + everySecMoneyAll, 3))

         setRealAllTimeSmall(round(realAllTimeSmall + everySecMoneySmall, 2))
         setRealAllTimeLarge(round(realAllTimeLarge + everySecMoneyLarge, 2))
         setRealAllTimeRefrigerator(round(realAllTimeRefrigerator + everySecMoneyRefrigerator, 2))
         setRealAllTimeAll(round(realAllTimeAll + everySecMoneyAll, 2))

         // увеличиваю оффшор
         dispatch(userActions.setBank(round(bank + everySecMoneyAll, 2)))
      }, 1000);
      return () => clearInterval(interval);
   }, [realProfitSmall, realProfitRefrigerator, realProfitLarge, realProfitAll, bank]);

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
            {realAllTimeAll}₽
            <p className={styles.profit}>+{realProfitAll}₽</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.column}>
               <p className={styles.size}>Small</p>
               <p className={styles.money_2}>{realAllTimeSmall}₽</p>
               <p className={styles.profit}>+{realProfitSmall}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Large</p>
               <p className={styles.money_2}>{realAllTimeLarge}₽</p>
               <p className={styles.profit}>+{realProfitLarge}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Холодильник</p>
               <p className={styles.money_2}>
                  {realAllTimeRefrigerator}₽
               </p>
               <p className={styles.profit}>+{realProfitRefrigerator}₽</p>
            </div>
         </div>
      </div>
   )
}