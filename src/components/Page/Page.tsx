import React, {FC} from "react";
import styles from "./styles.module.scss"


type PropsType = {
   bg?: string
   h100?: boolean
}

export const Page:FC<PropsType> = ({children, bg, h100}) => (
   <div
      style={{background: bg, height: h100 ? "100%" : ""}}
      className={styles.wrapper}
   >
      {children}
   </div>
)