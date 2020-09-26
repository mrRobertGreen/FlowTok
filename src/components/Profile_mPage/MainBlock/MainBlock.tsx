import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Info from "./Info/Info";
import Balance from "./Balance/Balance";
import Stats from "./Stats/Stats";
import DropUpMenu from "../DropUpMenu/DropUpMenu";
import classNames from "classnames";
import {Nullable, RootStateType} from "../../../redux/store";
import {BlogProfileDataType} from "../../../redux/user/user-reducer";
import Preloader from "../../common/Preloader/Preloader";
import Button from "../../Button/Button";
import {NavLink} from "react-router-dom";
import {useCache} from "../../../hooks/useCache";
import {useSelector} from "react-redux";
import MiniCard from "./MiniCard/MiniCard";
import Refs from "./Refs/Refs";

type PropsType = {
   isDesktop: boolean
   profileData: Nullable<BlogProfileDataType>
   exit: () => void
}

const MainBlock: FC<PropsType> = ({isDesktop, profileData, exit}) => {
   const [isMenuVisible, setMenuVisible] = useState(false)
   const hideMenu = () => {
      if (isMenuVisible) setMenuVisible(false)
   }
   const isVerify = useSelector((state: RootStateType) => state.user.isVerify)
   const blogProfileCache = useCache("blogProfile")

   if (blogProfileCache && !profileData) {
      profileData = blogProfileCache
   }

   if (!profileData) {
      return <Preloader/>
   }
   const {
      rate,
      name,
      login,
      image,
      fans,
      heart,
      medianViews,
      valueUp,
      valueDown,
      rating,
      holdUp,
      holdDown,
      needVerification
   } = profileData

   return (
      <div className={styles.wrapper}>
         <div className={styles.grid}>
            <Balance valueDown={valueDown} valueUp={valueUp}/>
            <MiniCard label={"Ждет\n зачисления"} value={6703.50} pad={"10px 10px 0 10px"}/>
            <MiniCard label={"Получено за все время"} value={164520.30} pad={"10px 10px 0 0"}/>
            <Stats medianViews={medianViews} rate={rate} rating={rating}/>
            <Refs/>
         </div>
      </div>
   )
}

export default MainBlock