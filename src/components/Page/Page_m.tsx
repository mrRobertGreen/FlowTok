import React, {FC} from "react";
import styles from "./styles.module.scss"

type PropsType = {}

export const Page_m: FC<PropsType> = ({children}) => {
   return (
      <div className={styles.wrapper}>
         {children}
      </div>
   )
}