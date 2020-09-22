import React from "react";
import {Page} from "../../components/Page/Page";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {LoginVK} from "./VK/LoginVK";
import {LoginGoogle} from "./Google/LoginGoogle";

export const Login = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <Page>
         <div className={styles.container}>
            <div className={styles.container__item}>
               <div className={styles.title}>Вход</div>
               <div className={styles.column}>
                  <div className={styles.btn}>
                     <LoginGoogle/>
                  </div>
                  <div className={styles.btn}>
                     <LoginVK/>
                  </div>
                  <div className={styles.label}>Нет аккаунта в FLowTok? Зарегистрируйтесь!</div>
                  <div className={styles.btn_submit}>
                     <NavLink to={"/reg"}>
                        <Button mod={"black"}>Зарегистрироваться</Button>
                     </NavLink>
                  </div>
               </div>
            </div>
         </div>
      </Page>
   )
}