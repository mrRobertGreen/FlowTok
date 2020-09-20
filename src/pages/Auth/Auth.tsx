import React from "react";
import {Page} from "../../components/Page/Page";
import {Logo} from "../../components/Logo/Logo";
import {LoginVideo} from "../../components/LoginVideo'/LoginVideo";
import {Login} from "../Login/Login";
import {useLocation} from "react-router";
import {Registration} from "../Registration/Registration";

export const Auth = () => {
   // detect url and show Login or Register
   const pathname = useLocation().pathname

   return (
      <Page>
         <LoginVideo/>
         <Logo/>
         {pathname === "/login" && <Login/>}
         {pathname === "/reg" && <Registration/>}
      </Page>
   )
}