import React, {FC, useEffect} from 'react';
import styles from "./styles.module.scss"
import MainBlock from "../../components/Profile_mPage/MainBlock/MainBlock";
import NavBar_m from "../../components/NavBar_m/NavBar_m";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {userActions} from "../../redux/user/user-reducer"
import {compose} from 'redux'
import {withAuthRedirect, withCabinetRedirect, withTaskRedirect} from "../../hocs/hocs";
import {exit} from "../../redux/auth/auth-reducer";
import {Page} from "../../components/Page/Page";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useRedirect} from "../../hooks/useRedirect";

type PropsType = {}

export type PageNamesType = "Profile" | "Work" | "Settings"

export const Profile: FC<PropsType> = ({}) => {
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)

   useRedirect(!isAuth, "/login")

   return (
      <Page bg={"#E5E5EA"} isNavbar={true} pageName={"Profile"}>
         <TopNavbar logo={true}
                    label={"Профиль"}
                    br={" 0px 0px 11px 11px"}
         />
         <MainBlock/>
      </Page>
   )
}
