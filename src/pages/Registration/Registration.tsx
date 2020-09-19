import React from "react";
import {Page} from "../../components/Page/Page";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {TikTokForm} from "../../components/forms/TikTokForm/TikTokForm";
import {UserDataForm} from "../../components/forms/UserDataForm/UserDataForm";

export const Registration = () => {

   return (
      <Page>
         <TopNavbar label={"Регистрация"}/>
         <div className={styles.container}>
            <div className={styles.btn}>
               <Button mod={"Google"} isActive={true}>Войти через Google</Button>
            </div>
            <div className={styles.btn}>
               <Button mod={"VK"}> Войти через VK</Button>
            </div>
            <TikTokForm/>
            <UserDataForm/>
         </div>
      </Page>
   )
}