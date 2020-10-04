import React from "react";
import {Page} from "../../components/Page/Page";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {TikTokForm} from "../../components/forms/TikTokForm/TikTokForm";
import {UserDataForm} from "../../components/forms/UserDataForm/UserDataForm";
import {Separator} from "../../components/Separator/Separator";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {NavLink} from "react-router-dom";
import {LoginGoogle} from "../Login/Google/LoginGoogle";
import {LoginVK} from "../Login/VK/LoginVK";
import {LoginVideo} from "../../components/LoginVideo'/LoginVideo";
import {Logo} from "../../components/Logo/Logo";
import {RegForm} from "../../components/forms/RegForm/RegForm";

export const Registration = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   const loginSuccess = useSelector((state: RootStateType) => state.auth.loginSuccess)
   const tikTokSuccess = useSelector((state: RootStateType) => state.auth.tikTokSuccess)
   const verifySuccess = useSelector((state: RootStateType) => state.auth.verifySuccess)

   return (
      <Page h100={true}>
         {isDesktop && <LoginVideo/>}
         {isDesktop && <Logo/>}
         {!isDesktop && <TopNavbar label={"Регистрация"} logo={false}/>}
         <div className={styles.container}>
            {isDesktop &&
            <div className={styles.title}>
	            Регистрация
            </div>}
            <div className={styles.block}>
               <RegForm/>
            </div>
         </div>
      </Page>
   )
}