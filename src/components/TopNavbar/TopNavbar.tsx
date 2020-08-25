import React, {FC} from "react";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styles from "./styles.module.scss"
import backArrow from "../../media/icons/back_arrow_icon.svg"
import menuIcon from "../../media/icons/menu_btn.svg"


type PropsType = {
   label: string
   isDesktop: boolean
   isMenu: boolean
   setMenuVisible?: (flag: boolean) => void
   isMenuVisible?: boolean
}

const TopNavbar:FC<PropsType & RouteComponentProps> = ({label,
                                                          setMenuVisible,
                                                          isMenuVisible,
                                                          isDesktop,
                                                          history,
                                                          isMenu}) => {
   const goBack = () => {
      history.goBack()
   }
   const showMenu = () => {
      if (setMenuVisible && isMenuVisible) {
         setMenuVisible(!isMenuVisible)
      }
   }

   return (
      <div className={styles.wrapper}
           style={{width: `${isDesktop ? `${document.body.clientHeight * 0.47229219}px` : "100%"}`}}>
         <div className={styles.container}
              >
            <div className={styles.backIcon} onClick={goBack}>
               <img src={backArrow} alt=""/>
            </div>
            <div className={styles.label}>
               {label}
            </div>
            <div className={styles.menu}
                 onClick={showMenu}
                 style={{visibility: `${isMenu ? "visible" : "hidden"}` as "visible" | "hidden"}}>
               <img src={menuIcon} alt=""/>
            </div>
         </div>
      </div>

   )
}

export default withRouter(TopNavbar)