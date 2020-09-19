import React, {FC} from "react";
import styles from "./styles.module.scss"

type PropsT = {
   fz?: string
}

export const Label: FC<PropsT> = ({
                                     children,
                                     fz
                                  }) => {
   return (
      <div className={styles.wrapper} style={{fontSize: fz}}>
         {children}
      </div>

   )
}