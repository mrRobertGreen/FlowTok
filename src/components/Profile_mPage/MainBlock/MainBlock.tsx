import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import Info from "./Info/Info";
import Balance from "./Balance/Balance";
import Stats from "./Stats/Stats";
import DropUpMenu from "../DropUpMenu/DropUpMenu";
import classNames from "classnames";
import {Nullable, RootStateType} from "../../../redux/store";
import {BlogProfileDataType, getUserData} from "../../../redux/user/user-reducer";
import Preloader from "../../common/Preloader/Preloader";
import Button from "../../Button/Button";
import {NavLink} from "react-router-dom";
import {History} from "./History/History";
import {useCache} from "../../../hooks/useCache";
import {useDispatch, useSelector} from "react-redux";
import {AllProfit} from "./AllProfit/AllProfit";
import {Refs} from "./Refs/Refs";
import {Container} from "../../Container/Container";
import {Card} from "../../Card/Card";
import {Gift} from "../../Gift/Gift";
import {OffShore} from "../../OffShore/OffShore";
import {DAY_SECONDS, getSecondsToday} from "../../../utils/getRealTimeProfit";


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
      allDayMoney,
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

            <div className={styles.balance}>
               <Balance value={wallet} history={history}/>
            </div>
            <OffShore bank={bank}/>
            <div className={styles.miniCard2}>
               <AllProfit allTimeMoney={allTimeMoney} allDaySum={allDayMoney}/>
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