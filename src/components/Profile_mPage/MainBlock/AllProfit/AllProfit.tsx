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
   maxBank: number
}

export const AllProfit: FC<PropsType> = ({maxBank}) => {
   const dispatch = useDispatch()
   const bank = useSelector((state: RootStateType) => state.user.bank)
   const data = useSelector((state: RootStateType) => state.user.realMoneyData)
   const cy = useSelector((state: RootStateType) => state.app.cy)

   const {t} = useTranslation()

   // увеличение каждую секунду
   useEffect(() => {
      const interval = setInterval(() => {
         if (data && bank && data.everySecMoney.all > 0) {
            // console.log("bank: " + bank)
            // console.log("\n")

            if (bank + data.everySecMoney.all / 10 > maxBank) {
               // достигли максимума
               dispatch(userActions.setBank(maxBank))
            } else {
               // увеличиваю оффшор
               dispatch(userActions.setBank(bank + data.everySecMoney.all / 10))
            }
         }

      }, 100);
      return () => clearInterval(interval);
   }, [bank, data]);


   // увеличение каждую секунду
   useEffect(() => {
      const interval = setInterval(() => {
         if (data && data.everySecMoney.all > 0) {
            /* тут закомменчены консоль логи, вдруг понадобятся */

            // console.log("everySecMoneySmall: " + data.everySecMoney.small)
            // console.log("realDayMoneySmall: " + data.realDayMoney.small)
            //
            // console.log("everySecMoneyLarge: " + data.everySecMoney.large)
            // console.log("realDayMoneyLarge: " + data.realDayMoney.large)
            //
            // console.log("everySecMoneyRefrigerator: " + data.everySecMoney.refrigerator)
            // console.log("realDayMoneyRefrigerator: " + data.realDayMoney.refrigerator)
            //
            // console.log("everySecMoneyAll: " + data.everySecMoney.all)
            // console.log("realDayMoneyAll: " + data.realDayMoney.all)
            // console.log("\n")

            if (bank && bank + data.everySecMoney.all / 10 > maxBank) {
               return
            } else {
               const realTimeData: RealMoneyDataT = {
                  everySecMoney: {...data.everySecMoney},
                  realAllTimeMoney: {
                     all: data.realAllTimeMoney.all + data.everySecMoney.all / 10,
                     large: data.realAllTimeMoney.large + data.everySecMoney.large / 10,
                     refrigerator: data.realAllTimeMoney.refrigerator + data.everySecMoney.refrigerator / 10,
                     small: data.realAllTimeMoney.small + data.everySecMoney.small / 10,
                  },
                  realDayMoney: {
                     all: data.realDayMoney.all + data.everySecMoney.all / 10,
                     large: data.realDayMoney.large + data.everySecMoney.large / 10,
                     refrigerator: data.realDayMoney.refrigerator + data.everySecMoney.refrigerator / 10,
                     small: data.realDayMoney.small + data.everySecMoney.small / 10,
                  }
               }

               dispatch(userActions.setRealMoneyData(realTimeData))
            }

            if (getSecondsToday() === 0) dispatch(getUserData())  // обновление в 00:00
         }

      }, 100);
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
               <div className={`${styles.column} ${styles.last}`}>
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


/* Тут закомменчена посл-ть условий для равномерного распеределения заработка
                * с каждого контейнера в момент, когда оффшор переполнен.
                * Мне не совсем понравилось, как она работала, поэтому я пока её выключил.
                * Но в последствии, если нужно, то можно её доработать*/


// if (data.everySecMoney.refrigerator > 0 && data.everySecMoney.small > 0 && data.everySecMoney.large > 0) {
//     const realTimeData: RealMoneyDataT = {
//         everySecMoney: {...data.everySecMoney},
//         realAllTimeMoney: {
//             all: data.realAllTimeMoney.all + difference / 10,
//             large: data.realAllTimeMoney.large + difference / 3 / 10,
//             refrigerator: data.realAllTimeMoney.refrigerator + difference / 3 / 10,
//             small: data.realAllTimeMoney.small + difference / 3 / 10,
//         },
//         realDayMoney: {
//             all: data.realDayMoney.all + difference / 10,
//             large: data.realDayMoney.large + difference / 3 / 10,
//             refrigerator: data.realDayMoney.refrigerator + difference / 3 / 10,
//             small: data.realDayMoney.small + difference / 3 / 10,
//         }
//     }
//     dispatch(userActions.setRealMoneyData(realTimeData))
//
// } else if (data.everySecMoney.refrigerator > 0 && data.everySecMoney.small > 0) {
//     const realTimeData: RealMoneyDataT = {
//         everySecMoney: {...data.everySecMoney},
//         realAllTimeMoney: {
//             all: data.realAllTimeMoney.all + difference / 10,
//             large: data.realAllTimeMoney.large,
//             refrigerator: data.realAllTimeMoney.refrigerator + difference / 2 / 10,
//             small: data.realAllTimeMoney.small + difference / 2 / 10,
//         },
//         realDayMoney: {
//             all: data.realDayMoney.all + difference / 10,
//             large: data.realDayMoney.large,
//             refrigerator: data.realDayMoney.refrigerator + difference / 2 / 10,
//             small: data.realDayMoney.small + difference / 2 / 10,
//         }
//     }
//     dispatch(userActions.setRealMoneyData(realTimeData))
//
// } else if (data.everySecMoney.large > 0 && data.everySecMoney.small > 0) {
//     const realTimeData: RealMoneyDataT = {
//         everySecMoney: {...data.everySecMoney},
//         realAllTimeMoney: {
//             all: data.realAllTimeMoney.all + difference / 10,
//             large: data.realAllTimeMoney.large + difference / 2 / 10,
//             refrigerator: data.realAllTimeMoney.refrigerator,
//             small: data.realAllTimeMoney.small + difference / 2 / 10,
//         },
//         realDayMoney: {
//             all: data.realDayMoney.all + difference / 10,
//             large: data.realDayMoney.large + difference / 2 / 10,
//             refrigerator: data.realDayMoney.refrigerator ,
//             small: data.realDayMoney.small + difference / 2 / 10,
//         }
//     }
//     dispatch(userActions.setRealMoneyData(realTimeData))
//
// } else if (data.everySecMoney.large > 0 && data.everySecMoney.refrigerator > 0) {
//     const realTimeData: RealMoneyDataT = {
//         everySecMoney: {...data.everySecMoney},
//         realAllTimeMoney: {
//             all: data.realAllTimeMoney.all + difference / 10,
//             large: data.realAllTimeMoney.large + difference / 2 / 10,
//             refrigerator: data.realAllTimeMoney.refrigerator + difference / 2 / 10,
//             small: data.realAllTimeMoney.small,
//         },
//         realDayMoney: {
//             all: data.realDayMoney.all + difference / 10,
//             large: data.realDayMoney.large + difference / 2 / 10,
//             refrigerator: data.realDayMoney.refrigerator + difference / 2 / 10,
//             small: data.realDayMoney.small,
//         }
//     }
//     dispatch(userActions.setRealMoneyData(realTimeData))
//
// } else if (data.everySecMoney.large > 0) {
//     const realTimeData: RealMoneyDataT = {
//         everySecMoney: {...data.everySecMoney},
//         realAllTimeMoney: {
//             all: data.realAllTimeMoney.all + difference / 10,
//             large: data.realAllTimeMoney.large + difference / 10,
//             refrigerator: data.realAllTimeMoney.refrigerator,
//             small: data.realAllTimeMoney.small,
//         },
//         realDayMoney: {
//             all: data.realDayMoney.all + difference / 10,
//             large: data.realDayMoney.large + difference / 10,
//             refrigerator: data.realDayMoney.refrigerator,
//             small: data.realDayMoney.small,
//         }
//     }
//     dispatch(userActions.setRealMoneyData(realTimeData))
//
// } else if (data.everySecMoney.small > 0) {
//     const realTimeData: RealMoneyDataT = {
//         everySecMoney: {...data.everySecMoney},
//         realAllTimeMoney: {
//             all: data.realAllTimeMoney.all + difference / 10,
//             large: data.realAllTimeMoney.large ,
//             refrigerator: data.realAllTimeMoney.refrigerator,
//             small: data.realAllTimeMoney.small + difference / 10,
//         },
//         realDayMoney: {
//             all: data.realDayMoney.all + difference / 10,
//             large: data.realDayMoney.large,
//             refrigerator: data.realDayMoney.refrigerator,
//             small: data.realDayMoney.small + difference / 10,
//         }
//     }
//     dispatch(userActions.setRealMoneyData(realTimeData))
//
// } else if (data.everySecMoney.refrigerator > 0) {
//     const realTimeData: RealMoneyDataT = {
//         everySecMoney: {...data.everySecMoney},
//         realAllTimeMoney: {
//             all: data.realAllTimeMoney.all + difference / 10,
//             large: data.realAllTimeMoney.large ,
//             refrigerator: data.realAllTimeMoney.refrigerator + difference / 10,
//             small: data.realAllTimeMoney.small,
//         },
//         realDayMoney: {
//             all: data.realDayMoney.all + difference / 10,
//             large: data.realDayMoney.large,
//             refrigerator: data.realDayMoney.refrigerator + difference / 10,
//             small: data.realDayMoney.small,
//         }
//     }
//     dispatch(userActions.setRealMoneyData(realTimeData))
// }