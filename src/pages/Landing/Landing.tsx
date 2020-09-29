import React from "react";
import styles from "./styles.module.scss"
import { Header } from "./Header/Header";
import {Main} from "./Main/Main";
import {Stats} from "./Stats/Stats";
import {Page} from "../../components/Page/Page";

export const Landing = () => {
   return (
      <Page isNavbar={false}>
         <Header/>
         <Main/>
         <Stats/>
      </Page>
   )
}