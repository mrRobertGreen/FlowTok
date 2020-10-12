import React, {FC} from "react";
import styles from "./styles.module.scss"
import settingsIcon from "../../media/icons/settings_icon.svg"
import settingsIconActive from "../../media/icons/settings_icon_active.svg"
import {NavLink} from "react-router-dom";
import {PageNamesType} from "../../pages/Profile/Profile";
import {useDispatch} from "react-redux";
import {getUserData} from "../../redux/user/user-reducer";
import {useTranslation} from "react-i18next";

type PropsType = {
   pageName?: PageNamesType
   newTasksNumber: number | null
}

const NavBar_m: FC<PropsType> = ({pageName, newTasksNumber}) => {
   const dispatch = useDispatch()
   const {t} = useTranslation()

   return (
      <nav className={styles.wrapper}>
         <div className={styles.navbar}>
            <NavLink to={"/profile"} className={styles.item} onClick={() => dispatch(getUserData())}>
               <svg width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={pageName === "Profile" ? styles.activeIcon : styles.icon}>
                  <path d="M17 19V17C17 14.7909 15.2091 13 13 13H5C2.79086 13 1 14.7909 1 17V19" stroke="#979797"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="5" r="4" stroke="#979797" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
               </svg>
               <div
                  className={styles.label}
                  style={{color: `${pageName === "Profile" ? "#000" : "#979797"}`}}
               >
                  {t("profile-label")}
               </div>
            </NavLink>
            <NavLink to={"/containers/small"} className={styles.item}>
               <svg width="18" height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={pageName !== "Work" ? styles.unActiveIcon : styles.icon}
               >
                  <path d="M17 19V5C17 2.79086 15.2091 1 13 1H5C2.79086 1 1 2.79086 1 5V19" stroke="url(#paint0_linear)"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                     <linearGradient id="paint0_linear" x1="-2.99989" y1="125.792" x2="0.48428" y2="115.81" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2E1C9C"/>
                        <stop offset="1" stopColor="#7031E9"/>
                     </linearGradient>
                  </defs>
               </svg>
               <div
                  className={styles.label}
                  style={{color: `${pageName === "Work" ? "#000" : "#979797"}`}}
               >
                  {t("container-title")}
               </div>
            </NavLink>
            <NavLink to={"/settings"} className={styles.item}>
               <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className={pageName === "Settings" ? styles.activeIcon : styles.icon}>
                  <g id="sliders">
                     <path id="Path" d="M4.5 19V12" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path id="Path_2" d="M4.5 8V1" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path id="Path_3" d="M12.5 19V10" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path id="Path_4" d="M12.5 6V1" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path id="Path_5" d="M20.5 19V14" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path id="Path_6" d="M20.5 10V1" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path id="Path_7" d="M1 11.5H7" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path id="Path_8" d="M9 6.5H15" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path id="Path_9" d="M17 13.5H23" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
               </svg>

               <div
                  className={styles.label}
                  style={{color: `${pageName === "Settings" ? "#000" : "#979797"}`}}
               >
                  {t("settings-title")}
               </div>
            </NavLink>
         </div>
      </nav>
   )
}

export default NavBar_m;