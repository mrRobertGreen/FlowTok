import React, {FC} from "react";
import styles from "./styles.module.scss"
import Button from "../../../Button/Button";
import {NavLink} from "react-router-dom";

export type PropsType = {
   valueUp: number
   valueDown: number
   holdUp: number
   holdDown: number
}

const Balance: FC<PropsType> = ({valueUp, valueDown, holdUp, holdDown}) => {

   return (
      <div className={styles.wrapper}>
         <div className={styles.row}>
            <div className={styles.column}>
               <div className={styles.header}>
                  Ваш баланс
               </div>
               <div className={styles.balance}>
                  <div className={styles.rub}>
                     {valueUp}
                  </div>
                  <div className={styles.kop}>
                     ,{valueDown}₽
                  </div>
               </div>
            </div>
            <div className={styles.column}>
               <div className={styles.header}>
                  В холде
               </div>
               <div className={styles.balance_grey}>
                  <div className={styles.rub}>
                     {holdUp}
                  </div>
                  <div className={styles.kop}>
                     ,{holdDown} ₽
                  </div>
               </div>
            </div>
         </div>
         <div className={styles.btn}>
            <NavLink to={"/withdraw"}>
               <Button mod="light">Вывести</Button>
            </NavLink>
         </div>
      </div>
   )

}

export default Balance