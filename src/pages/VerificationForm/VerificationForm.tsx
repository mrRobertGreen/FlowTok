import React, {FC} from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import styles from "./styles.module.scss"
import {VerifyForm} from "./Form/Form";
import {RootStateType} from "../../redux/store";


export const VerificationForm: FC = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return (
      <div className={styles.wrapper}>
         <TopNavbar isMenu={false} label={"Верификация"} isDesktop={isDesktop}/>
         <VerifyForm/>
      </div>
   )
}
