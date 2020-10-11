import React from "react";
import {Header} from "./Header/Header";
import {Main} from "./Main/Main";
import {Stats} from "./Stats/Stats";
import {Page} from "../../components/Page/Page";
import {useRedirect} from "../../hooks/useRedirect";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

export const Landing = () => {
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)
   useRedirect(isAuth, "/profile")

   return (
      <Page isNavbar={false}>
         <Header/>
         <Main/>
         <Stats/>
      </Page>
   )
}