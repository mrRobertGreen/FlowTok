import React, {FC} from 'react';
import styles from "./styles.module.scss"
import MainBlock from "../../components/Profile_mPage/MainBlock/MainBlock";
import NavBar_m from "../../components/NavBar_m/NavBar_m";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {userActions} from "../../redux/user/user-reducer"
import {compose} from 'redux'
import {withAuthRedirect, withCabinetRedirect, withTaskRedirect} from "../../hocs/hocs";
import {exit} from "../../redux/auth/auth-reducer";

type PropsType = {}

export type PageNamesType = "Profile" | "Work" | "Settings"

const Profile_m: FC<PropsType & PropsFromRedux> = ({ blogProfile, exit}) => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return (
      <div className={styles.wrapper}>
         <MainBlock isDesktop={isDesktop} profileData={blogProfile} exit={exit}/>
         <NavBar_m
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

export default compose<FC>(
   connector,
   withTaskRedirect,
   // withCabinetRedirect,
   withAuthRedirect,
)(Profile_m)