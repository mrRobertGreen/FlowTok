import React, {ComponentType, FC, useState} from "react";
import {Page_m} from "../../components/Page/Page_m";
import {RouteComponentProps, withRouter} from "react-router";
import InputMask from "react-input-mask";
import Input from "../../components/Input/Input";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import MaskedInput from 'react-text-mask'
import { compose } from "redux";
import {withAuthRedirect, withCabinetRedirect} from "../../hocs/hocs";

type PropsType = {}

export const withdrawTypes: { [key: string]: { [key: string]: string | Array<RegExp | string>} } = {
   qiwi: {
      label: "Qiwi кошелек",
      placeholder: "Введите номер кошелька",
      mask: ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
   },
   card: {
      label: "Банковская карта",
      placeholder: "Введите номер карты",
      mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
   },
   yandex: {
      label: "Yandex Деньги",
      placeholder: "Введите номер кошелька",
      mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]
   },
   phone: {
      label: "Номер телефона",
      placeholder: "Введите номер телефона",
      mask: ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
   },
   webm: {
      label: "Webmoney",
      placeholder: "Введите номер кошелька",
      mask: ["Z", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
   }
}

const Withdraw_m: FC<PropsType & RouteComponentProps> = ({match}) => {

   //@ts-ignore
   const type = match.params.type as string

   const [inputValue, setInputValue] = useState("")

   const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
   }
   return (
      <Page_m>
         <div className={styles.container}>
            <div className={styles.blockTop}>
               <div className={styles.blockTop__header}>
                  {withdrawTypes[type].label}
               </div>
               <div className={styles.blockTop__input}>
                  <MaskedInput
                     mask={withdrawTypes[type].mask as Array<RegExp | string>}
                     onChange={onChangeValue}
                     value={inputValue}
                     placeholder={withdrawTypes[type].placeholder as string}
                     className={styles.input}
                  />
               </div>
            </div>
            <div className={styles.btn}>
               <Button>
                  Заказать выплату
               </Button>
            </div>
         </div>
      </Page_m>
   )
}

export default compose<ComponentType>(
   withRouter,
   withAuthRedirect,
   withCabinetRedirect
)(Withdraw_m)