import React, {FC} from "react";
import {TopupForm} from "./TopupForm/TopupForm";
import styles from "./styles.module.scss"
import TopNavbar from "../../components/TopNavbar/TopNavbar";

type PropsType = {
   isDesktop: boolean
}

export const Topup: FC<PropsType> = ({isDesktop}) => {
   return (
      <div className={styles.wrapper}>
         <TopNavbar label="Пополнение баланса" isMenu={false} isDesktop={isDesktop}/>
         <TopupForm/>
      </div>
   )
}