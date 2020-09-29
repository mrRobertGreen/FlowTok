import React, {FC} from "react";
import styles from "./styles.module.scss"
import Button from "../../../Button/Button";
import {NavLink} from "react-router-dom";
import {Card} from "../../../Card/Card";
import {Separator} from "../../../Separator/Separator";

export type PropsType = {
}

export const History: FC<PropsType> = () => {

   const history = [
      {
         operation: "+1 340.00 ₽",
         date: "Сегодня"
      },
      {
         operation: "-6 112.90 ₽",
         date: "30.08.2020"
      },

      {
         operation: "+1 120.00 ₽",
         date: "27.08.2020"
      },
      {
         operation: "+1 120.00 ₽",
         date: "27.08.2020"
      },
      {
         operation: "+1 120.00 ₽",
         date: "27.08.2020"
      },
      {
         operation: "+1 120.00 ₽",
         date: "27.08.2020"
      },
      {
         operation: "+1 120.00 ₽",
         date: "27.08.2020"
      },
   ]

   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         <div className={styles.title}>
            История
         </div>
         <div  className={styles.history}>
            {history.map(h => (
               <div>
                  <div className={styles.historyItem}>
                     <div className={h.operation[0] === "+" ? styles.operation_green : styles.operation_red}>
                        {h.operation}
                     </div>
                     <div className={styles.date}>
                        {h.date}
                     </div>
                  </div>
                  <Separator m={"0 0 10px"}/>
               </div>
            ))}
         </div>

      </div>
   )
}