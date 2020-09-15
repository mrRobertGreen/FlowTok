import React, {FC} from "react";
import styles from "./styles.module.scss"

export const Page:FC = ({children}) => (
   <div className={styles.wrapper}>
      {children}
   </div>
)