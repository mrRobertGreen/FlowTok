import React, {FC} from "react";
import styles from "./styles.module.scss"
import separator from "../../media/icons/HorisontalLine.svg"

type PropsT = {
   m?: string
   direction?: "column" | "row"
}


export const Separator: FC<PropsT> = ({m = "0", direction = "row"}) => {
   return (
      // <div className={direction === "row" ? styles.row : styles.column} style={{margin: m}}/>
      <div className={styles.wrapper} style={{margin: m}}>
         <img src={separator} alt=""/>
      </div>
   )
}