import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Balance from "../../components/Cabinet_mPage/Balance/Balance";
import Campaigns from "../../components/Cabinet_mPage/Campaigns/Campaigns";
import {RootStateType} from "../../redux/store";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect, withProfileRedirect} from "../../hocs/hocs";
import {changeAdvTaskStatus, getUserData} from "../../redux/user/user-reducer";
import Preloader from "../../components/common/Preloader/Preloader";
import classNames from "classnames";
import DropUpMenu from "../../components/Profile_mPage/DropUpMenu/DropUpMenu";
import {exit} from "../../redux/auth/auth-reducer";
import {useCache} from "../../hooks/useCache";

type PropsType = {}

const Cabinet_m: FC<PropsType & PropsFromRedux> = ({changeAdvTaskStatus, exit}) => {
   const [isMenuVisible, setMenuVisible] = useState(false)
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <div className={styles.wrapper}>

      </div>
   )
}

const mapDispatchToProps = {
   getUserData,
   changeAdvTaskStatus: changeAdvTaskStatus,
   exit,
}
const mapStateToProps = (state: RootStateType) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<FC>(
   withAuthRedirect,
   withProfileRedirect,
   connector,
)(Cabinet_m)