import React, {ComponentType, FC, useState} from "react";
import {Page_m} from "../../components/Page/Page_m";
import {RouteComponentProps, withRouter} from "react-router";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import MaskedInput from 'react-text-mask'
import {compose} from "redux";
import {withAuthRedirect, withCabinetRedirect} from "../../hocs/hocs";
import {useDispatch, useSelector} from "react-redux";
import {WithdrawPayloadType} from "../../api/user-api";
import Input from "../../components/Input/Input";
import {withdraw} from "../../redux/user-reducer";
import {RootStateType} from "../../redux/store";
import Preloader from "../../components/common/Preloader/Preloader";
import {WithdrawForm} from "../../components/forms/WithdrawForm/WithdrawForm";

type PropsType = {}

export const withdrawTypes: { [key: string]: { [key: string]: string | Array<RegExp | string> } } = {
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
   mc: {
      label: "Номер телефона",
      placeholder: "Введите номер телефона",
      mask: ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
   },
   webmoney: {
      label: "Webmoney Z",
      placeholder: "Введите номер кошелька",
      mask: ["Z", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
   },
   webmoneyWmr: {
      label: "Webmoney R",
      placeholder: "Введите номер кошелька",
      mask: ["R", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
   }
}
export type WithdrawTypes =
   "mc"
   | "card"
   | "webmoney"
   | "webmoneyWmr"
   | "yandex"
   | "qiwi"

const Withdraw_m: FC<PropsType & RouteComponentProps> = ({match}) => {

   //@ts-ignore
   const type = match.params.type as WithdrawTypes
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)

   if (isFetching) return <Preloader/>

   return (
      <Page_m>
         <div className={styles.container}>
            <WithdrawForm type={type}/>
         </div>
      </Page_m>
   )
}

export default compose<ComponentType>(
   withRouter,
   withAuthRedirect,
   withCabinetRedirect
)(Withdraw_m)