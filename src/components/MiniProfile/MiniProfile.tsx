import React, {FC} from "react";
import styles from "./styles.module.scss"
import icon from "../../media/icons/google.svg"
import {Separator} from "../Separator/Separator";
import {useDispatch} from "react-redux";
import {authActions} from "../../redux/auth/auth-reducer";

export const MiniProfile: FC = () => {
   const dispatch = useDispatch()

   const onChangeAcc = () => {
      dispatch(authActions.setTikTokSuccess(false))
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <div className={styles.profile}>
               <img src={icon} alt="" className={styles.avatar}/>
               <div className={styles.name}>
                  <div className={styles.label}>
                     karinakross
                  </div>
                  <div className={styles.subLabel}>
                     @karinakross
                  </div>
               </div>
            </div>
            <div className={styles.btn} onClick={onChangeAcc}>
               Изменить аккаунт
            </div>
         </div>
         <Separator m={"12px 0"}/>
      </div>
   )
}