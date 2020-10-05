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
import {useDispatch, useSelector} from "react-redux";
import {BlogProfileDataType, getUserData} from "../../redux/user/user-reducer";
import {Logo} from "../Logo/Logo";
import {RootStateType} from "../../redux/store";
import {useCache} from "../../hooks/useCache";
import {Separator} from "../Separator/Separator";
import vkIcon from "../../media/icons/vk_link.svg"
import tgIcon from "../../media/icons/tg_link.svg"
import instIcon from "../../media/icons/inst_link.svg"

type PropsType = {
   pageName?: PageNamesType
   newTasksNumber: number | null
}

const NavBar: FC<PropsType> = ({pageName, newTasksNumber}) => {
   newTasksNumber = 3
   const dispatch = useDispatch()
   let profileData = useSelector((state: RootStateType) => state.user.blogProfile)

   if (!profileData) {
      profileData = {
         usersForMoney: 123,
         needVerification: false,
         type: "blog",
         image: "",
         login: "@sdfg",
         medianViews: "123",
         name: "Dima",
         rate: 123,
         rating: 123,
         heart: "123",
         fans: "12M",
         valueDown: 12,
         valueUp: 213,
         holdUp: 12,
         holdDown: 12,
         admin: false,
         newTask: 3,
         isOffer: false
      } as BlogProfileDataType
   }

   const {name, login, image} = profileData


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
            <div className={styles.profile}>
               <img src={image} alt="" className={styles.avatar}/>
               <div className={styles.info}>
                  <div className={styles.name}>
                     {name}
                  </div>
                  <div className={styles.surname}>
                     {login}
                  </div>
               </div>
            </div>
            <Separator m={"0"}/>
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
            <NavLink to={"/work"} className={styles.item}>
               <div className={styles.iconWrap}>
                  <img src={pageName === "Work" ? workIconActive : workIcon} alt="" className={styles.icon}/>
                  {pageName === "Profile" && newTasksNumber &&
						<div className={styles.notification}>
                     {newTasksNumber}
						</div>}
               </div>
               <div
                  className={styles.label}
                  style={pageName === "Work" ?
                     gradientText
                     : {color: "#979797"}}
               >
                  Задания
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
            <div className={styles.socialItems}>
               <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                  <img src={vkIcon} alt="" className={styles.socialItem}/>
               </a>
               <a href="https://telegram.com" target="_blank" rel="noopener noreferrer">
                  <img src={tgIcon} alt="" className={styles.socialItem}/>
               </a>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src={instIcon} alt="" className={styles.socialItem}/>
               </a>
            </div>
         </div>
         <div className={styles.rights}>
            © FlowTok. All Rights Reserved.
         </div>
      </nav>
   )
}

export default NavBar;