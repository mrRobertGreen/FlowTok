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
      <div className={styles.wrapper} data-test={"wrapper"}>
         <div className={styles.row} data-test={"row"}>
            <div className={styles.column} data-test={"column"}>
               <div className={styles.header} data-test={"header"}>
                  Ваш баланс
               </div>
               <div className={styles.balance} data-test={"balance"}>
                  <div className={styles.rub} data-test={"rub"}>
                     {valueUp}
                  </div>
                  <div className={styles.kop} data-test={"kop"}>
                     ,{valueDown}₽
                  </div>
               </div>
            </div>
            <div className={styles.column} data-test={"column"}>
               <div className={styles.header} data-test={"header"}>
                  В холде
               </div>
               <div className={styles.balance_grey} data-test={"balance_grey"}>
                  <div className={styles.rub} data-test={"rub"}>
                     {holdUp}
                  </div>
                  <div className={styles.kop} data-test={"kop"}>
                     ,{holdDown} ₽
                  </div>
               </div>
            </div>
         </div>
         <div className={styles.btn} data-test={"btn"}>
            <NavLink to={"/withdraw"}>
               <Button data-test={"button"}>Вывести</Button>
            </NavLink>
         </div>
      </div>
   )

}

export default Balance