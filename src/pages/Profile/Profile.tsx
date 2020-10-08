import React, {FC} from 'react';
import MainBlock from "../../components/Profile_mPage/MainBlock/MainBlock";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
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
