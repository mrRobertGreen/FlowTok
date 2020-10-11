import React, {FC} from "react";
import styles from "./styles.module.scss"
import homeIcon from "../../media/icons/home_icon.svg"
import workIcon from "../../media/icons/work_icon.svg"
import settingsIcon from "../../media/icons/settings_icon.svg"
import homeIconActive from "../../media/icons/home_icon_active.svg"
import workIconActive from "../../media/icons/work_icon_active.svg"
import settingsIconActive from "../../media/icons/settings_icon_active.svg"
import {NavLink} from "react-router-dom";
import {PageNamesType} from "../../pages/Profile/Profile";
import {useDispatch} from "react-redux";
import {getUserData} from "../../redux/user/user-reducer";
import {Logo} from "../Logo/Logo";
import {Separator} from "../Separator/Separator";

type PropsType = {
   pageName?: PageNamesType
   newTasksNumber: number | null
}

const NavBar: FC<PropsType> = ({pageName, newTasksNumber}) => {
   newTasksNumber = 3
   const dispatch = useDispatch()

   const gradientText = {
      background: "linear-gradient(143.49deg, #030F6B -41.61%, #7633F0 98.25%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0px 0px 10px rgba(255, 251, 118, 0.4)",
   }

   return (
      <nav className={styles.wrapper}>
         <Logo/>
         <div className={styles.navbar}>
            <NavLink to={"/profile"} onClick={() => dispatch(getUserData())}>
               <div className={styles.item}>
                  <img src={pageName === "Profile" ? homeIconActive : homeIcon} alt="" className={styles.icon}/>
                  <div
                     className={styles.label}
                     style={pageName === "Profile" ?
                        gradientText
                        : {color: "#979797"}}
                  >
                     Главная
                  </div>
               </div>
            </NavLink>
            <NavLink to={"/containers/:type"} className={styles.item}>
               <div className={styles.iconWrap}>
                  <img src={workIcon} alt="" className={styles.icon}/>
                  {pageName === "Profile"}
               </div>
               <div
                  className={styles.label}
                  style={pageName === "Work" ?
                     gradientText
                     : {color: "#979797"}}
               >
                  Контейнеры
               </div>
            </NavLink>
            <NavLink to={"/settings"} className={styles.item}>
               <img src={pageName === "Settings" ? settingsIconActive : settingsIcon} alt="" className={styles.icon}/>
               <div
                  className={styles.label}
                  style={pageName === "Settings" ?
                     gradientText
                     : {color: "#979797"}}
               >
                  Настройки
               </div>
            </NavLink>
         </div>
         <div className={styles.rights}>
            © Take Containers. All Rights Reserved.
         </div>
      </nav>
   )
}

export default NavBar;