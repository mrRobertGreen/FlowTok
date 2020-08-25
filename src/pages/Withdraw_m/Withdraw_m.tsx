import React, {ComponentType, FC} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import styles from "./styles.module.scss"
import {compose} from "redux";
import {withAuthRedirect, withCabinetRedirect} from "../../hocs/hocs";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import Preloader from "../../components/common/Preloader/Preloader";
import {WithdrawForm} from "../../components/forms/WithdrawForm/WithdrawForm";
import TopNavbar from "../../components/TopNavbar/TopNavbar";

type PropsType = {
   isDesktop: boolean
}

export const withdrawTypes: { [key in WithdrawTypes]: { [key: string]: string | Array<RegExp | string> } } = {
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

const Withdraw_m: FC<PropsType & RouteComponentProps> = ({match, isDesktop}) => {

   //@ts-ignore
   const type = match.params.type as WithdrawTypes

   return (
      <div className={styles.wrapper}>
         <TopNavbar isDesktop={isDesktop} isMenu={false} label={"Вывод средств"}/>
         <WithdrawForm type={type}/>
      </div>
   )
}

export default compose<ComponentType>(
   withRouter,
   withAuthRedirect,
   withCabinetRedirect
)(Withdraw_m)