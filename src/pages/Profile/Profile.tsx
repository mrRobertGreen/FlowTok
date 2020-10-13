import React, {FC} from 'react';
import MainBlock from "../../components/Profile_mPage/MainBlock/MainBlock";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Page} from "../../components/Page/Page";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useRedirect} from "../../hooks/useRedirect";
import {useTranslation} from "react-i18next";

type PropsType = {}

export type PageNamesType = "Profile" | "Work" | "Settings"

export const Profile: FC<PropsType> = () => {
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)
   const userName = useSelector((state: RootStateType) => state.user.userData?.userName)

   useRedirect(!isAuth, "/login")
   const { t } = useTranslation();

   return (
      <Page bg={"#E5E5EA"} isNavbar={true} pageName={"Profile"}>
         <TopNavbar logo={true}
                    label={t('profile-label')}
                    subLabel={userName}
                    br={" 0px 0px 11px 11px"}
         />
         <MainBlock/>
      </Page>
   )
}
