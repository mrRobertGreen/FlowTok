import React, {FC} from "react";
import styles from "./styles.module.scss"
import homeIcon from "../../../media/icons/home_icon.svg"
import workIcon from "../../../media/icons/wort_icon.svg"
import homeIconActive from "../../../media/icons/home_icon_active.svg"
import workIconActive from "../../../media/icons/work_icon_active.svg"
import {NavLink} from "react-router-dom";
import {PageNamesType} from "../../../pages/Profile_m/Profile_m";
import {useDispatch} from "react-redux";
import {getUserData} from "../../../redux/user/user-reducer";

type PropsType = {
   isDesktop: boolean
   pageName: PageNamesType
   newTasksNumber: number | null
}

const NavBar: FC<PropsType> = ({isDesktop, pageName, newTasksNumber}) => {

   const dispatch = useDispatch()

   return (
      <nav className={styles.wrapper}>
         <div className={styles.navbar}
              style={{width: `${isDesktop ? `${document.body.clientHeight * 0.47229219}px` : "100%"}`}}>
            <NavLink to={"/profile"} className={styles.item} onClick={() => dispatch(getUserData())}>
               <div className={styles.icon}
                    style={{background: `url(${pageName === "Profile" ? homeIconActive : homeIcon}) 0 0/100% 100% no-repeat`}}/>
               <div
                  className={styles.label}
                  style={{color: `${pageName === "Profile" ? "#67CE8C" : "#C5CAC9"}`}}
               >
                  Главная
               </div>
            </NavLink>
            <NavLink to={"/work"} className={styles.item}>
               <div className={styles.icon}
                    style={{background: `url(${pageName === "Work" ? workIconActive : workIcon}) 0 0/100% 100% no-repeat`}}>
                  {pageName === "Profile" && newTasksNumber &&
			         <div className={styles.notification}>
                     {newTasksNumber}
			         </div>}
               </div>
               <div
                  className={styles.label}
                  style={{color: `${pageName === "Work" ? "#67CE8C" : "#C5CAC9"}`}}
               >
                  Работа
               </div>
            </NavLink>
         </div>
      </nav>
   )

}

export default NavBar