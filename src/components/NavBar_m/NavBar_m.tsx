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
import panelIcon from "../../media/icons/Panel.svg";
import panelIconActive from "../../media/icons/PanelActive.svg";
import archiveIcon from "../../media/icons/archive.svg";
import archiveIconActive from "../../media/icons/ArchiveActive.svg";

type PropsType = {
    pageName?: PageNamesType
    newTasksNumber: number | null
    isAdProfile?: boolean
}

const NavBar_m: FC<PropsType> = ({pageName, newTasksNumber, isAdProfile}) => {
    newTasksNumber = 3
    const dispatch = useDispatch()

    if (isAdProfile) {
        return (
            <nav className={styles.wrapper}>
                <div className={styles.navbar}>
                    <NavLink to={"/ad/panel"} className={styles.item} onClick={() => dispatch(getUserData())}>
                        <img src={pageName === "Profile" ? panelIcon : panelIconActive} alt="" className={styles.icon}/>
                        <div
                            className={styles.label}
                            style={{color: `${pageName === "Profile" ? "#000" : "#979797"}`}}
                        >
                            Панель
                        </div>
                    </NavLink>
                    <NavLink to={"/work"} className={styles.item}>
                        <div className={styles.iconWrap}>
                            <img src={pageName === "Work" ? archiveIcon : archiveIconActive} alt="" className={styles.icon}/>
                            {pageName === "Profile" && newTasksNumber &&
                            <div className={styles.notification}>
                                {newTasksNumber}
                            </div>}
                        </div>
                        <div
                            className={styles.label}
                            style={{color: `${pageName === "Work" ? "#000" : "#979797"}`}}
                        >
                            Архив
                        </div>
                    </NavLink>
                    <NavLink to={"/settings"} className={styles.item}>
                        <img src={pageName === "Settings" ? settingsIconActive : settingsIcon} alt=""
                             className={styles.icon}/>
                        <div
                            className={styles.label}
                            style={{color: `${pageName === "Settings" ? "#000" : "#979797"}`}}
                        >
                            Настройки
                        </div>
                    </NavLink>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className={styles.wrapper}>
                <div className={styles.navbar}>
                    <NavLink to={"/profile"} className={styles.item} onClick={() => dispatch(getUserData())}>
                        <img src={pageName === "Profile" ? homeIconActive : homeIcon} alt="" className={styles.icon}/>
                        <div
                            className={styles.label}
                            style={{color: `${pageName === "Profile" ? "#000" : "#979797"}`}}
                        >
                            Главная
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
                            style={{color: `${pageName === "Work" ? "#000" : "#979797"}`}}
                        >
                            Задания
                        </div>
                    </NavLink>
                    <NavLink to={"/settings"} className={styles.item}>
                        <img src={pageName === "Settings" ? settingsIconActive : settingsIcon} alt=""
                             className={styles.icon}/>
                        <div
                            className={styles.label}
                            style={{color: `${pageName === "Settings" ? "#000" : "#979797"}`}}
                        >
                            Настройки
                        </div>
                    </NavLink>
                </div>
            </nav>
        )
    }
}

export default NavBar_m;