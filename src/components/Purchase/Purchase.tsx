import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {Input} from "../Input/Input";
import VerticalLine from "../../media/images_new/VerticalLine.svg";
import percentIcon from "../../media/images_new/conture.svg"
import Button from "../Button/Button";
import {BuyContainerReqBodyT, BuyContainerT} from "../../api/user-api";
import {calculateContainerData,} from "../../utils/calculateContainerData";
import battery_0 from "../../media/batteryIcons/0.svg"
import battery_1 from "../../media/batteryIcons/10.svg"
import battery_2 from "../../media/batteryIcons/20.svg"
import battery_3 from "../../media/batteryIcons/30.svg"
import battery_4 from "../../media/batteryIcons/40.svg"
import battery_5 from "../../media/batteryIcons/50.svg"
import battery_6 from "../../media/batteryIcons/60.svg"
import battery_7 from "../../media/batteryIcons/70.svg"
import battery_8 from "../../media/batteryIcons/80.svg"
import battery_9 from "../../media/batteryIcons/90.svg"
import battery_10 from "../../media/batteryIcons/100.svg"
import {useDispatch} from "react-redux";
import {buyContainer, ContainerT} from "../../redux/user/user-reducer";
//import plus from "../../media/images_new/PlusButton.svg";
import plus from "../../media/images_new/PlusButton.svg"
import {setIn} from "formik";
import {CyT, LangT} from "../../redux/app/app-reducer";

type PropsT = {
   data: BuyContainerT
   type: ContainerT
}

export const Purchase: FC<PropsT> = ({data, type}) => {

   const dispatch = useDispatch()
   const [inputValue, setInputValue] = useState("")
   const [inputError, setInputError] = useState("")
   const [isLoading, setIsLoading] = useState(false)
   const [isAllSum, setIsAllSum] = useState(false)
   const [realTimeData, setRealTimeData] = useState({
      whole: 0,
      percent: ["0"],
   })

   const {cost, percent, wallet} = data

   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isNaN(+e.target.value)) return
      else {
         setInputValue(e.target.value)
         if (+e.target.value > wallet) {
            setInputValue("" + wallet)
            setIsAllSum(true)
         } else {
            setIsAllSum(false)
         }
      }
   }

   useEffect(() => {
      if (inputValue) setInputError("")
   }, [inputValue])

   useEffect(() => {
      setRealTimeData(calculateContainerData(cost, +inputValue))
   }, [inputValue, cost])

   const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (+inputValue < data.min) {
         setInputError(`Сумма не может быть меньше ${data.min}`)
         return
      }

      const body: BuyContainerReqBodyT = {
         amount: +inputValue,
         date: new Date().getTime(),
         type: type,
         cy: localStorage.getItem("cy") as CyT,
         lang: localStorage.getItem("lang") as LangT,
      }
      dispatch(buyContainer(body, setIsLoading))
      setInputValue("")

   }

   const getPercentIcon = (percent: number, whole: number) => {
      switch (true) {
         case percent === 0 && whole === 0:
            return battery_0
         case percent === 0 && whole !== 0:
            return battery_10
         case percent < 15:
            return battery_1
         case percent < 25:
            return battery_2
         case percent < 35:
            return battery_3
         case percent < 45:
            return battery_4
         case percent < 55:
            return battery_5
         case percent < 65:
            return battery_6
         case percent < 75:
            return battery_7
         case percent < 85:
            return battery_8
         case percent < 95:
            return battery_9
         default:
            return battery_10
      }
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <button className={styles.purchase}>Покупка</button>
            <div>
               <p className={styles.numbers}>
                  Ваш баланс: {wallet}₽
               </p>
               <button className={styles.plusButton}><img src={plus} style={{width: "17px"}} alt=""/></button>
            </div>

         </div>
         <div>
            {/*<div className={styles.allSum}>*/}
            {/*   <Button*/}
            {/*      mod={"white"}*/}
            {/*      isActive={isAllSum}*/}
            {/*      onClick={() => {*/}
            {/*         setIsAllSum(true)*/}
            {/*         setInputValue(""+wallet)*/}
            {/*      }}*/}
            {/*   >*/}
            {/*      На всю сумму*/}
            {/*   </Button>*/}
            {/*</div>*/}
            <Input
               errorMessage={inputError}
               isError={!!inputError}
               mod={"white"}
               placeholder={"Сумма"}
               onChange={onChangeInput}
               value={inputValue}
               inputMode={"tel"}
            />
         </div>
         <div className={styles.container}>

            <img src={getPercentIcon(+realTimeData.percent, +realTimeData.whole)}
                 className={styles.image} alt=" "/>
            <img src={VerticalLine} alt="" className={styles.separator}/>

            <div className={styles.container__right}>
               <div className={styles.text}>
                  <div className={styles.text__little}>Количество</div>
                  <div
                     className={styles.text__large}>{`${realTimeData.whole} шт. + ${realTimeData.percent}%`}</div>
                  <div
                     className={styles.text__little}>{`До ${realTimeData.whole + 1} шт. осталось ${100 - +realTimeData.percent}%`}</div>
               </div>
            </div>
         </div>
         <div className={styles.profitability}>
            <div className={styles.profitability__container}>
               <p className={styles.text__little}>Доходность</p>
               <p className={styles.text__large}><span className={styles.greenPercent}>{percent}%</span> в день
               </p>
            </div>
            <div className={styles.profitability__Btn}>
               <Button mod={isLoading ? "loading" : "gradient"}
                       children={"Купить"}
                       type={"submit"}
                       onClick={onSubmit}
               /></div>
         </div>

      </div>
   )
}