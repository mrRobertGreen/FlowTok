import React, {FC} from "react";
import styles from "./styles.module.scss"

type PropsT = {
   m?: string
}

export const Separator: FC<PropsT> = ({m = "0"}) => {
   return (
      <div className={styles.wrapper} style={{margin: m}}/>
   )
}