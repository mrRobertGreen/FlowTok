import React, {FC} from "react";
import  styles from "./styles.module.scss"

export const Title: FC = ({children}) => {
   return (
      <div className={styles.wrapper}>
         {children}
      </div>

   )
}