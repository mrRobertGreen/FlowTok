import React from "react";
import {Page} from "../../components/Page/Page";
import styles from "./styles.module.scss"
import {Logo} from "../../components/Logo/Logo";
import {RegForm} from "../../components/forms/RegForm/RegForm";

export const Registration = () => {

   return (
      <Page h100={true}>
         <Logo/>
         <div className={styles.wrapper}>
            <div className={styles.container}>
               <div className={styles.container__item}>
                  <div className={styles.title}>Регистрация</div>
                  <div className={styles.column}>
                     <RegForm/>
                  </div>
               </div>
            </div>
         </div>

      </Page>
   )
}