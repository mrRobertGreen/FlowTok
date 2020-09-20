import React from "react";
import {Page} from "../../components/Page/Page";
import {Logo} from "../../components/Logo/Logo";
import {LoginVideo} from "../../components/LoginVideo'/LoginVideo";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Login} from "../Login/Login";

export const Auth = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <Page>
         <LoginVideo/>
         <Logo/>
         <Login/>
      </Page>
   )
}