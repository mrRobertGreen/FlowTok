import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

/*
* Карточка для профиля
* */


type PropsT = {
   size?: "small" | "big"
}

export const Card: FC<PropsT> = ({

                                    children,
                                    size

                                 }) => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   let style;

   if (isDesktop && size === "small") {
      style = {padding: "61px 50px"}
   } else if (isDesktop && size === "big") {
      style = {padding: "65px 60px"}
   } else {
      style = {padding: "20px 25px"}
   }
   return (
      <div style={style}
           className={styles.wrapper}>
         {children}
      </div>
   )
}