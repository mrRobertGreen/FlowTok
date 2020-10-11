import React from "react";
import {Page} from "../../components/Page/Page";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import styles from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {exit} from "../../redux/auth/auth-reducer";
import {RootStateType} from "../../redux/store";
import {useRedirect} from "../../hooks/useRedirect";

const Settings = () => {

   const dispatch = useDispatch()
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)

   useRedirect(!isAuth, "/login")

   const onExit = () => {
      dispatch(exit())
   }

   return (
      <Page bg={"#E5E5EA"} isNavbar={true} pageName={"Settings"}>
         <TopNavbar label={"Настройки"} logo={true} br={" 0px 0px 11px 11px"}/>
         <div className={styles.wrapper}>
            <div className={styles.enter}>
               <button className={styles.enter__btn} onClick={onExit}>Выйти</button>
            </div>
         </div>
      </Page>
   )
}

export default Settings