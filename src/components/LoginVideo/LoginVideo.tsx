import React from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import loginImage from "../../media/images/login_image.svg"
import {useLocation} from "react-router";

export const LoginVideo = () => {
   const isDesktop = useSelector(((state: RootStateType) => state.app.isDesktop))

   return (
      <div className={styles.video}>
         {!isDesktop && <img src={loginImage} alt=""/>}
      </div>
   )
}