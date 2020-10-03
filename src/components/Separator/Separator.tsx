import React, {FC} from "react";
import styles from "./styles.module.scss"
import separatorX from "../../media/icons/HorisontalLine.svg"


type PropsT = {
   m?: string
}


export const Separator: FC<PropsT> = ({m = "0"}) => {
   return (
      <div className={styles.wrapper} style={{margin: m}}>
         <img src={separatorX} alt=""/>
      </div>
   )
}