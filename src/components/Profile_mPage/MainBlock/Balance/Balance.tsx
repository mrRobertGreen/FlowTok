import React, {FC} from "react";
import styles from "./styles.module.scss"
import Button from "../../../Button/Button";
import {NavLink} from "react-router-dom";
import {Card} from "../../../Card/Card";

export type PropsType = {
   valueUp: number
   valueDown: number
}

const Balance: FC<PropsType> = ({valueUp, valueDown}) => {

   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         <div>
            <div className={styles.title}>
               Кошелек
            </div>
            <div className={styles.label}>
               Ваш баланс
            </div>
            <div className={styles.money}>
               {valueUp}.{valueDown}₽
            </div>
         </div>

         <div className={styles.btn} data-test={"btn"}>
            <NavLink to={"/withdraw"}>
               <Button data-test={"button"} mod={"gradient"}>Выплатить</Button>
            </NavLink>
         </div>
      </div>
   )
}

export default Balance