import React, {FC} from "react";
import styles from "./styles.module.scss"

type PropsT = {
   jc?: string
   ai?: string
}

export const Row: FC<PropsT> = ({
                                      children,
                                      jc = "center",
                                      ai= "center"
                                   }) => {
   return (
      <div className={styles.wrapper} style={{justifyContent: jc, alignItems: ai}}>
         {children}
      </div>

   )
}