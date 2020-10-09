import React from "react";
import {Page} from "../../components/Page/Page";
import styles from "./styles.module.scss"
import {LoginVideo} from "../../components/LoginVideo'/LoginVideo";
import {Logo} from "../../components/Logo/Logo";
import {LoginForm} from "../../components/forms/LoginForm/LoginForm";
import {RegForm} from "../../components/forms/RegForm/RegForm";

export const Login = () => {

   return (
      <Page h100={true}>
         <Logo/>
         <LoginVideo/>
         <div className={styles.container}>
            <div className={styles.container__item}>
               <div className={styles.title}>Регистрация</div>
               <div className={styles.column}>
                   <RegForm />
               </div>
            </div>
         </div>
      </Page>
   )
}