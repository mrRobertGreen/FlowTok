import React from "react";
import {Page} from "../../components/Page/Page";
import {Logo} from "../../components/Logo/Logo";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import {LoginVideo} from "../../components/LoginVideo'/LoginVideo";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

export const Login = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <Page>
         <LoginVideo/>
         <Logo/>
         <div className={styles.container}>
            <div className={styles.container__item}>
               <div className={styles.title}>Вход</div>
               <div className={styles.column}>
                  <div className={styles.btn}>
                     <Button mod={"Google"}>Войти через Google</Button>
                  </div>
                  <div className={styles.btn}>
                     <Button mod={"VK"}> Войти через VK</Button>
                  </div>
                  <div className={styles.label}>Нет аккаунта в FLowTok? Зарегистрируйтесь!</div>
                  <div className={styles.btn_submit}>
                     <NavLink to={"/registration"}>
                        <Button mod={"black"}>Зарегистрироваться</Button>
                     </NavLink>
                  </div>
               </div>
            </div>
         </div>
      </Page>
   )
}