import React, {FC} from "react";
import styles from "./styles.module.scss"


type PropsType = {
   bg?: string
}

export const Page:FC<PropsType> = ({children, bg}) => (
   <div
      style={{background: bg}}
      className={styles.wrapper}
   >
      {children}
   </div>
)