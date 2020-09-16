import React, {FC} from "react";
import styles from "./styles.module.scss"

type PropsT = {
   jc?: string
   ai?: string
   w?: string
}

export const Column: FC<PropsT> = ({
                                      children,
                                      jc = "center",
                                      ai= "center",
   w= "100%"
                                   }) => {
   return (
      <div className={styles.wrapper} style={{justifyContent: jc, alignItems: ai, width: w}}>
         {children}
      </div>

   )
}