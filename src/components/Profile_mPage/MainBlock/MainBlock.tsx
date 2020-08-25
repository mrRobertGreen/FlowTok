import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Info from "./Info/Info";
import Balance from "./Balance/Balance";
import Stats from "./Stats/Stats";
import DropUpMenu from "../DropUpMenu/DropUpMenu";
import classNames from "classnames";
import {Nullable, RootStateType} from "../../../redux/store";
import {BlogProfileDataType} from "../../../redux/user-reducer";
import Preloader from "../../common/Preloader/Preloader";
import {useSelector} from "react-redux";
import Button from "../../Button/Button";
import {NavLink} from "react-router-dom";

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

   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)
   let refData = useSelector((state: RootStateType) => state.user.refData)
   const blogCacheData = localStorage.getItem("blogData")
   const refCacheData = localStorage.getItem("refData")

   if (blogCacheData && !profileData) {
      profileData = JSON.parse(blogCacheData)
   }
   if (refCacheData && !refData) {
      refData = JSON.parse(refCacheData)
   }
   if (!profileData || !refData) {
      return <Preloader/>
   }

   const {refs} = refData

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
   } = profileData

   return (
      <div className={styles.wrapper}>
         {isMenuVisible && <div
				style={{height: "100%", overflow: "hidden"}}
				className={classNames({[styles.dark]: isMenuVisible})}
				onClick={hideMenu}
			/>}

         <Info setMenuVisible={setMenuVisible}
               isMenuVisible={isMenuVisible}
               fans={fans}
               heart={heart}
               image={image}
               login={login}
               name={name}
         />
         { refs < 5 &&
            <div className={styles.btn}>
               <NavLink to={"/refs"}>
                  <Button mod={"bright"}>Заработать на рефералах</Button>
               </NavLink>
            </div>
         }
         <Balance valueDown={valueDown} valueUp={valueUp} holdDown={holdDown} holdUp={holdUp}/>
         <Stats medianViews={medianViews} rate={rate} rating={rating}/>
         {isMenuVisible && <DropUpMenu hideMenu={hideMenu} isDesktop={isDesktop} exit={exit}/>}
      </div>
   )
}

export default MainBlock