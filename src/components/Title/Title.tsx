import React, {FC} from "react";
import  styles from "./styles.module.scss"

type PropsT = {
   fz?: string
}

export const Title: FC<PropsT> = ({children, fz}) => {
   return (
      <div
         style={{fontSize: fz}}
         className={styles.wrapper}
      >
         {children}
      </div>
   )
}