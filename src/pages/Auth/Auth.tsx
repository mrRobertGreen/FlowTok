import React from "react";
import {Page} from "../../components/Page/Page";
import {Logo} from "../../components/Logo/Logo";
import {LoginVideo} from "../../components/LoginVideo'/LoginVideo";
import {Login} from "../Login/Login";
import {useLocation} from "react-router";
import {Registration} from "../Registration/Registration";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

export const Auth = () => { // NEED TO SPLIT TO TWO PAGES
   const pathname = useLocation().pathname
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <Page>
         <LoginVideo/>
         <Logo/>
         {pathname === "/login" && <Login/>}
         {pathname === "/reg" && <Registration/>}
      </Page>
   )
}