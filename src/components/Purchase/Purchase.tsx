import React, {FC, useState} from "react";
import styles from "./styles.module.scss";
import {Input} from "../Input/Input";
import VerticalLine from "../../media/images_new/VerticalLine.svg";
import percentIcon from "../../media/images_new/conture.svg"
import Button from "../Button/Button";
import {BuyContainerT} from "../../api/user-api";

type PropsT = {
   data: BuyContainerT
}

export const Purchase: FC<PropsT> = ({data}) => {

   const [inputValue, setInputValue] = useState("")
   const [isAllSum, setIsAllSum] = useState(false)

   const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
      if (inputValue === ""+wallet) {
         setIsAllSum(true)
      } else {
         setIsAllSum(false)
      }
   }

   const {cost, percent, wallet} = data

   return (
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <button className={styles.purchase}>Покупка</button>
            <p className={styles.numbers}>{wallet}₽</p>
         </div>
         <div>
            <div className={styles.allSum}>
               <Button
                  mod={"white"}
                  isActive={isAllSum}
                  onClick={() => {
                     setIsAllSum(true)
                     setInputValue(""+wallet)
                  }}
               >
                  На всю сумму
               </Button>
            </div>
            <Input
               mod={"white"}
               type={"number"}
               placeholder={"Своя сумма"}
               onChange={onChangeInput}
               value={inputValue}
            />
         </div>
         <div className={styles.container}>
            <img src={percentIcon} className={styles.image} alt=" "/>
            <img src={VerticalLine} alt="" className={styles.separator}/>
            <div className={styles.text}>
               <div className={styles.text__little}>Количество</div>
               <div className={styles.text__large}>{"1шт. + 30%"}</div>
               <div className={styles.text__little}>{"До 2 штук осталось 70% "}</div>
            </div>
         </div>
         <div className={styles.profitability}>
            <div className={styles.profitability__container}>
               <p className={styles.text__little}>Доходность</p>
               <p className={styles.text__large}><span className={styles.greenPercent}>{percent}%</span> в день </p>
            </div>
            <button className={styles.profitability__Btn}>Пополнить</button>
         </div>
         <Button mod={"gradient"} children={"Купить"}/>
      </div>
   )
}