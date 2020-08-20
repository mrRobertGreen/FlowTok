import React from "react";
import styles from "./styles.module.scss"
import first from "../../media/images/1.png"
import second from "../../media/images/2.png"
import third from "../../media/images/3.png"
import Button from "../../components/Button/Button";
import {NavLink} from "react-router-dom";
import * as JivoSite from "react-jivosite";
import { compose } from "redux";
import {withCabinetRedirect, withProfileRedirect} from "../../hocs/hocs";

const Landing = () => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.block}>
            <div className={styles.label}>
               Снимаешь видео в Тик Ток бесплатно?
            </div>
            <div className={styles.btn}>
               <NavLink to={"/login/1"}>
                  <Button>Начать зарабатывать</Button>
               </NavLink>
               <div className={styles.text}>
                  <p>Нажимая кнопку выше, вы подтвержадете, что соглашаетесь с <a target="_blank" rel="noopener noreferrer"
                                                                                  href="/user_terms">Пользовательским
                     соглашением</a></p>
               </div>
            </div>
            <div className={styles.image}>
               <img src={first} alt=""/>
            </div>
         </div>
         <div className={styles.block}>
            <div className={styles.label}>
               Пора зарабатывать с FlowTok!
            </div>
            <div className={styles.btn}>
               <NavLink to={"/login/1"}>
                  <Button>Начать зарабатывать</Button>
               </NavLink>
               <div className={styles.text}>
                  <p>Нажимая кнопку выше, вы подтвержадете, что соглашаетесь с <a target="_blank" rel="noopener noreferrer"
                                                                                  href="/user_terms">Пользовательским
                     соглашением</a></p>
               </div>
            </div>
            <div className={styles.image}>
               <img src={second} alt=""/>
            </div>
         </div>
         <div className={styles.block}>
            <div className={styles.label}>
               Снимай видео в Тик Ток и получай за это деньги💰
            </div>
            <div className={styles.btn}>
               <NavLink to={"/login/1"}>
                  <Button>Начать зарабатывать</Button>
               </NavLink>
               <div className={styles.text}>
                  <p>Нажимая кнопку выше, вы подтвержадете, что соглашаетесь с <a target="_blank" rel="noopener noreferrer"
                                                                                  href="/user_terms">Пользовательским
                     соглашением</a></p>
               </div>
            </div>
            <div className={styles.image}>
               <img src={third} alt=""/>
            </div>
            <JivoSite.Widget id="IWfuuFCaXR" />

         </div>
      </div>
   )
}

export default compose(
   withCabinetRedirect,
   withProfileRedirect
)(Landing)