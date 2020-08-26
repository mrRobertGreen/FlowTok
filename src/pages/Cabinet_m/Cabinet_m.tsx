import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Balance from "../../components/Cabinet_mPage/Balance/Balance";
import Campaigns from "../../components/Cabinet_mPage/Campaigns/Campaigns";
import {RootStateType} from "../../redux/store";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect, withProfileRedirect} from "../../hocs/hocs";
import {changeAdvTaskStatus, getUserData} from "../../redux/user-reducer";
import Preloader from "../../components/common/Preloader/Preloader";
import classNames from "classnames";
import DropUpMenu from "../../components/Profile_mPage/DropUpMenu/DropUpMenu";
import {exit} from "../../redux/auth-reducer";

type PropsType = {}

const Cabinet_m: FC<PropsType & PropsFromRedux> = ({advProfile, changeAdvTaskStatus, exit}) => {
   const [isMenuVisible, setMenuVisible] = useState(false)
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   const hideMenu = () => {
      if (isMenuVisible) setMenuVisible(false)
   }

   if (!advProfile) {
      return <Preloader/>
   }

   const {value} = advProfile
   return (
      <div className={styles.wrapper}>
         {isMenuVisible && <div
		      style={{height: "100%", overflow: "hidden"}}
		      className={classNames({[styles.dark]: isMenuVisible})}
		      onClick={hideMenu}
	      />}
         <Balance value={value} setMenuVisible={setMenuVisible} isMenuVisible={isMenuVisible}/>
         <Campaigns tasks={advProfile.tasks} changeAdvTaskStatus={changeAdvTaskStatus} />
         {isMenuVisible && <DropUpMenu hideMenu={hideMenu} isDesktop={isDesktop} exit={exit}/>}
      </div>
   )
}

const mapDispatchToProps = {
   getUserData,
   changeAdvTaskStatus: changeAdvTaskStatus,
   exit,
}
const mapStateToProps = (state: RootStateType) => ({
   advProfile: state.user.advProfile
});

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose(
   withAuthRedirect,
   withProfileRedirect,
   connector,
)(Cabinet_m)