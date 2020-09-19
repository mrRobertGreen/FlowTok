import React, {FC} from "react";
import {TopupForm} from "./TopupForm/TopupForm";
import styles from "./styles.module.scss"
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

type PropsType = {
}

export const Topup: FC<PropsType> = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return (
      <div className={styles.wrapper}>
         <TopNavbar label="Пополнение баланса" />
         <TopupForm/>
      </div>
   )
}