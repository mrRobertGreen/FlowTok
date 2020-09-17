import React, {FC} from "react";
import styles from "./styles.module.scss"

type PropsT = {
   p?: string
   w?: string
   mw?: string
}

export const Block: FC<PropsT> = ({
                                     children,
                                     p,
                                     w = "100%",
                                     mw = "100%"
                                  }) => {
   return (
      <div className={styles.wrapper} style={{padding: p, width: w, maxWidth: mw}}>
         {children}
      </div>

   )
}