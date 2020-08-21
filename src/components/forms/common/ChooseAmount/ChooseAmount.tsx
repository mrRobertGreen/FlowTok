import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type PropsType = {
   setFieldValue: (field: string, value: string | number) => void
   amount: string
   field: string
}

export const ChooseAmount: FC<PropsType> = ({setFieldValue, amount, field}) => {

   type ActiveBtnType = 100 | 500 | 1000 | 0  // 0 - nobody is selected
   const [activeBtn, setActiveBtn] = useState(0 as ActiveBtnType)

   useEffect(() => {
      switch (+amount) {
         case 100:
            setActiveBtn(100)
            break
         case 500:
            setActiveBtn(500)
            break
         case 1000:
            setActiveBtn(1000)
            break
         default:
            setActiveBtn(0)
      }
   }, [amount])

   return (
      <>
         <div className={styles.subLabel}>Выберите сумму</div>
         <div className={styles.btnGroup}>
            <div className={classNames(styles.btn, {
               [styles.activeBtn]: activeBtn === 100,
            })}
                 onClick={async () => {
                    await setActiveBtn(100)
                    setFieldValue(field, 100)
                 }}
            >
               100₽
            </div>
            <div className={classNames(styles.btn, {
               [styles.activeBtn]: activeBtn === 500,
            })}
                 onClick={async () => {
                    await setActiveBtn(500)
                    setFieldValue(field, 500)
                 }}
            >
               500₽
            </div>
            <div className={classNames(styles.btn, {
               [styles.activeBtn]: activeBtn === 1000,
            })}
                 onClick={async () => {
                    await setActiveBtn(1000)
                    setFieldValue(field, 1000)
                 }}
            >
               1000₽
            </div>
         </div>
      </>
   )

}