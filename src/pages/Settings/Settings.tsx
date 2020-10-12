import React, {useRef, useState} from "react";
import {Page} from "../../components/Page/Page";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import styles from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {exit} from "../../redux/auth/auth-reducer";
import {RootStateType} from "../../redux/store";
import {useRedirect} from "../../hooks/useRedirect";
import {ChooseLang} from "../../components/Input/Input";
import {useTranslation} from "react-i18next";
import {appActions, LangT} from "../../redux/app/app-reducer";

const Settings = () => {

   const dispatch = useDispatch()
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)
   const langFromState = useSelector((state: RootStateType) => state.app.lang)

   const {t} = useTranslation()

   useRedirect(!isAuth, "/login")

   const changeLang = (lang: LangT) => {
      if (langFromState !== lang) dispatch(appActions.setLang(lang))
   }

   const onExit = () => {
      dispatch(exit())
   }

   return (
      <Page bg={"#E5E5EA"} isNavbar={true} pageName={"Settings"}>
         <TopNavbar label={t("settings-title")} logo={true} br={" 0px 0px 11px 11px"}/>
         <div className={styles.wrapper}>
            <div className={styles.lang}>
               <div className={styles.label}>
                  {t("settings-lang")}
               </div>
               <ChooseLang changeLang={changeLang} checked={langFromState === "ru"}/>
            </div>
            <div className={styles.container}>
               <button className={styles.container__btn} onClick={onExit}>{t("settings-exit")}</button>
            </div>
         </div>
      </Page>
   )
}

export default Settings