import React, {ComponentType, FC} from "react";
import {Page_m} from "../../components/Page/Page_m";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {withRouter} from "react-router";
import {withAuthRedirect, withCabinetRedirect} from "../../hocs/hocs";
import {WithdrawTypes, withdrawTypes} from "../Withdraw_m/Withdraw_m";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

type PropsType = {}

const WithdrawTypes_m: FC<PropsType> = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return (
      <div className={styles.wrapper}>
         <TopNavbar label={"Вывод средств"}/>
         <div className={styles.container}>
            {Object.keys(withdrawTypes).map((key: string, idx: number) => (
               <div className={styles.btn} key={idx}>
                  <NavLink to={`/withdraw/${key}`}>
                     <Button>
                        {withdrawTypes[key as WithdrawTypes].label}
                     </Button>
                  </NavLink>
               </div>
            ))}
         </div>
      </div>
   )
}

export default compose<ComponentType>(
   withRouter,
   withAuthRedirect,
   withCabinetRedirect
)(WithdrawTypes_m)