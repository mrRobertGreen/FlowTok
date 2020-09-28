import React, {FC} from "react";
import styles from "./styles.module.scss"


type PropsType = {
   bg?: string
   h100?: boolean
   row?: boolean
}

export const Page: FC<PropsType> = ({
                                       children,
                                       bg,
                                       h100,
                                       row
                                    }) => {

   const style = {
      display: row ? "flex" : "",
      background: bg,
      height: h100 ? "100%" : "",

   }

   return (
      <div
         style={style}
         className={styles.wrapper}
      >
         {children}
      </div>
   )
}