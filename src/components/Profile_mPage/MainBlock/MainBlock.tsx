import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss";
import Balance from "./Balance/Balance";
import {RootStateType} from "../../../redux/store";
import {getContainers, getUserData, userActions} from "../../../redux/user/user-reducer";
import Preloader from "../../common/Preloader/Preloader";
import {useCache} from "../../../hooks/useCache";
import {useDispatch, useSelector} from "react-redux";
import {AllProfit} from "./AllProfit/AllProfit";
import {Refs} from "./Refs/Refs";
import {Container} from "../../Container/Container";
import {Gift} from "../../Gift/Gift";
import {OffShore} from "../../OffShore/OffShore";


type PropsType = {}

const MainBlock: FC<PropsType> = () => {
   let userData = useSelector((state: RootStateType) => state.user.userData)
   const userDataCache = useCache("userData")
   const dispatch = useDispatch()

   if (userDataCache && !userData) {
      userData = userDataCache
   }

   useEffect(() => {
      dispatch(getUserData())
   }, [])

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

   if (bank) dispatch(userActions.setBank(bank))

   return (
      <div className={styles.wrapper}>
         <div className={styles.grid}>
            {gift && <Gift title={"Подарок!"} text={"Контейнер Small на сумму 100₽"}/>}
            <div className={styles.balance}>
               <Balance value={wallet} history={history}/>
            </div>
           <OffShore/>
            <div className={styles.miniCard2}>
               <AllProfit allTimeMoney={allTimeMoney} allDayMoney={allDayMoney}/>
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