import React, {FC} from 'react';
import styles from "./styles.module.scss"
import MainBlock from "../../components/Profile_mPage/MainBlock/MainBlock";
import NavBar from "../../components/Profile_mPage/NavBar/NavBar";
import {connect, ConnectedProps} from "react-redux";
import {RootStateType} from "../../redux/store";
import {userActions} from "../../redux/user-reducer"
import {compose} from 'redux'
import {withAuthRedirect, withCabinetRedirect, withTaskRedirect} from "../../hocs/hocs";
import {exit} from "../../redux/auth-reducer";

type PropsType = {
   isDesktop: boolean
}

export type PageNamesType = "Profile" | "Work"

const Profile_m: FC<PropsType & PropsFromRedux> = ({isDesktop, blogProfile, exit}) => {

   return (
      <div className={styles.wrapper}>
         <MainBlock isDesktop={isDesktop} profileData={blogProfile} exit={exit}/>
         <NavBar
            isDesktop={isDesktop}
            pageName={"Profile"}
            newTasksNumber={blogProfile && blogProfile.newTask}
            />
      </div>
   )
}

const mapDispatchToProps = {
   setBlogProfile: userActions.setBlogProfile,
   exit
}
const mapStateToProps = (state: RootStateType) => ({
   blogProfile: state.user.blogProfile,
});

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose(
   connector,
   withTaskRedirect,
   withCabinetRedirect,
   withAuthRedirect,
)(Profile_m)