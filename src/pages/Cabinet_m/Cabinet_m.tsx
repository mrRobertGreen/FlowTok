import React, {FC} from "react";
import styles from "./styles.module.scss"
import Balance from "../../components/Cabinet_mPage/Balance/Balance";
import Campaigns from "../../components/Cabinet_mPage/Campaigns/Campaigns";
import {RootStateType} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect, withProfileRedirect} from "../../hocs/hocs";
import {changeAdvTaskStatus, getUserData} from "../../redux/user-reducer";
import Preloader from "../../components/common/Preloader/Preloader";

type PropsType = {}

const Cabinet_m: FC<PropsType & PropsFromRedux> = ({advProfile, changeAdvTaskStatus}) => {
   if (!advProfile) {
      return <Preloader/>
   }

   const {value} = advProfile
   return (
      <div className={styles.wrapper}>
         <Balance value={value}/>
         <Campaigns tasks={advProfile.tasks} changeAdvTaskStatus={changeAdvTaskStatus} />
      </div>
   )
}

const mapDispatchToProps = {
   getUserData,
   changeAdvTaskStatus: changeAdvTaskStatus
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