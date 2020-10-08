import React, {FC, useState} from "react";
import styles from "./styles.module.scss";
import Info from "./Info/Info";
import Balance from "./Balance/Balance";
import Stats from "./Stats/Stats";
import DropUpMenu from "../DropUpMenu/DropUpMenu";
import classNames from "classnames";
import {Nullable, RootStateType} from "../../../redux/store";
import {BlogProfileDataType} from "../../../redux/user/user-reducer";
import Preloader from "../../common/Preloader/Preloader";
import Button from "../../Button/Button";
import {NavLink} from "react-router-dom";
import {History} from "./History/History";
import {useCache} from "../../../hooks/useCache";
import {useSelector} from "react-redux";
import {AllProfit} from "./MiniCard/AllProfit";
import {Refs} from "./Refs/Refs";
import {Container} from "../../Container/Container";
import {Card} from "../../Card/Card";
import {Gift} from "../../Gift/Gift";
import {OffShore} from "../../OffShore/OffShore";


type PropsType = {}

const MainBlock: FC<PropsType> = () => {
   let userData = useSelector((state: RootStateType) => state.user.userData)
   const userDataCache = useCache("userData")

   if (userDataCache && !userData) {
      userData = userDataCache
   }

   if (!userData) {
      return <Preloader/>
   }

   const {
      allTimeMoney,
      containers,
      bank,
      referral,
      wallet,
      history,
      gift
   } = userData

   return (
      <div className={styles.wrapper}>
         <div className={styles.grid}>
            {gift && <Gift title={"Подарок!"} text={"Контейнер Small на сумму 100₽"}/>}
            <OffShore bank={bank}/>
            <div className={styles.balance}>
               <Balance value={wallet} history={history}/>
            </div>
            <div className={styles.miniCard2}>
               <AllProfit allTimeMoney={allTimeMoney}/>
            </div>
            {containers.map((item, idx) => (
               <Container isInformed={false} data={item} key={idx}/>
            ))}
            <div className={styles.refs}>
               <Refs refData={referral}/>
            </div>
         </div>
      </div>
   )
}

export default MainBlock