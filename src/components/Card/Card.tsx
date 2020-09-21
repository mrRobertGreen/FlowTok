import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

/*
* Карточка для профиля
* */


type PropsT = {
   size?: "small" | "big"
   m?: string
}

export const Card: FC<PropsT> = ({
                                    m,
                                    children,
                                    size

                                 }) => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   let style = {
      margin: m,
      padding: "61px 50px", // small desktop size
      borderRadius: "30px",
   }

   if (isDesktop && size === "big") {
      style.padding= "65px 60px"
   }
   if (!isDesktop) {
      style.padding = "20px 25px"
      style.borderRadius = "14px"
   }

   return (
      <div style={style}
           className={styles.wrapper}>
         {children}
      </div>
   )
}