import React from "react";
import styles from "./styles.module.scss"
import { Header } from "./Header/Header";
import {Main} from "./Main/Main";
import {Stats} from "./Stats/Stats";

export const Landing = () => {
   return (
      <div className={styles.wrapper}>
         <Header/>
         <Main/>
         <Stats/>
      </div>
   )
}