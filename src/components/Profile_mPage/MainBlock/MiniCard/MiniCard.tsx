import React, {FC} from "react";
import styles from "./styles.module.scss"

export type PropsType = {
   label: string
   value: number
   pad?: string
}

const MiniCard: FC<PropsType> = ({label, value, pad}) => {

   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         <div className={styles.label}>
            {label}
         </div>
         <div className={styles.money}>
            {value}₽
         </div>
      </div>
   )
}

export default MiniCard