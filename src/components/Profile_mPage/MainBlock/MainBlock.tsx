import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Info from "./Info/Info";
import Balance from "./Balance/Balance";
import Stats from "./Stats/Stats";
import DropUpMenu from "../DropUpMenu/DropUpMenu";
import classNames from "classnames";
import {Nullable} from "../../../redux/store";
import {BlogProfileDataType} from "../../../redux/user-reducer";
import Preloader from "../../common/Preloader/Preloader";
import Button from "../../Button/Button";
import {NavLink} from "react-router-dom";
import {useCache} from "../../../hooks/useCache";

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
      isOffer
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
         { isOffer &&
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