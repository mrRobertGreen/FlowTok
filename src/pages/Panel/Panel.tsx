import React from "react"
import {Page} from "../../components/Page/Page";
import NavBar_m from "../../components/NavBar_m/NavBar_m";

export const Panel = () => {
   return (
      <Page bg={"#EFEFF4"}>
      <NavBar_m newTasksNumber={3} pageName={"Profile"}/>
      
      </Page>
   )
}