import React, {FC, ReactChild} from "react";
import styles from "./styles.module.scss"

type PropsType = {
   isOpen: boolean
   children: ReactChild
}

const Modal: FC<PropsType> = ({children, isOpen}) => {
   return (
      <>
         <div className={styles.main}>
            {children}
            <div className={styles.dark}/>
         </div>
      </>
   )
}


export default Modal;