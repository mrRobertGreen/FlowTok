import React, {FC} from "react";
import styles from "./styles.module.scss"
import {Logo} from "../../../components/Logo/Logo";
import {NavLink} from "react-router-dom";
import {ChooseLang} from "../../../components/Input/Input";
import {appActions, LangT} from "../../../redux/app/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";


export const Header: FC = () => {

   const dispatch = useDispatch()
   const langFromState = useSelector((state: RootStateType) => state.app.lang)

   const changeLang = (lang: LangT) => {
      if (langFromState !== lang) {
         dispatch(appActions.setLang(lang))
         localStorage.setItem("lang", lang)
      }
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.logo}>
            <Logo/>
         </div>
         <div className={styles.toggler}>
            <ChooseLang changeLang={changeLang} checked={langFromState === "ru"}/>
         </div>

         <div className={styles.buttons}>
            <a href="#" className={styles.buttons__telegram}>Telegram</a>
            <a href="#" className={styles.buttons__mail}>Почта</a>
            <NavLink to={"/login"}>
               <div className={styles.buttons__createAcc}>
                  Создать аккаунт
               </div>
            </NavLink>
         </div>

      </div>
   )
}