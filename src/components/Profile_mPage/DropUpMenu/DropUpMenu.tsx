import React, {FC} from "react";
import styles from "./styles.module.scss"
import closeIcon from "../../../media/icons/close_icon.svg"
import ArrowRightIcon from "../../../media/icons/arrow_right_icon.svg"
import {NavLink} from "react-router-dom";

type PropsType = {
   hideMenu: () => void
   isDesktop: boolean
   exit: () => void
}

const DropUpMenu: FC<PropsType> = ({hideMenu, isDesktop, exit}) => {

   return (
      <div className={styles.wrapper} style={
         {
            width: `${isDesktop ? `${document.body.clientHeight * 0.47229219}px` : "100%"}`,
         }
      }>
         <div
            onClick={hideMenu}
            className={styles.close}
         >
            <img src={closeIcon} alt="close"/>
         </div>
         <div className={styles.item}>
            <div className={styles.title}>Ещё</div>
         </div>
         {/*<NavLink to={"/settings"}>*/}
         {/*   <div className={styles.item}>*/}
         {/*      <div>Настройки</div>*/}
         {/*      <img className={styles.arrow} src={ArrowRightIcon} alt=""/>*/}
         {/*   </div>*/}
         {/*</NavLink>*/}
         <NavLink to={"/refs"}>
            <div className={styles.item}>
               <div>Реферальная программа</div>
               <img className={styles.arrow} src={ArrowRightIcon} alt=""/>
            </div>
         </NavLink>
         <NavLink to={"/login/1"}>
            <div className={styles.item} onClick={() => exit()}>
               <div style={{color: "red"}}>Выйти</div>
               <img className={styles.arrow} src={ArrowRightIcon} alt=""/>
            </div>
         </NavLink>
      </div>
   )

}

export default DropUpMenu