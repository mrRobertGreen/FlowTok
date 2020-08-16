import React, {FC} from "react";
import styles from "./styles.module.scss"
import Button from "../../../components/Button/Button";
import {NavLink} from "react-router-dom";

type PropsType = {
   value: number
}

const Balance: FC<PropsType> = ({value}) => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.title}>
            Текущий баланс
         </div>
         <div className={styles.payInBlock}>
            <div className={styles.balance}>
               {value}₽
            </div>
            <div className={styles.btn}>
               <Button onButtonClick={() => {
               }} mod={"bright"}>
                  Пополнить
               </Button>
            </div>
         </div>
         <NavLink to={"/task_form"}>
            <Button onButtonClick={() => {}}>Создать кампанию</Button>
         </NavLink>
      </div>
   )
}

export default Balance