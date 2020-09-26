import React from "react";
import {Page} from "../../components/Page/Page";
import NavBar_m from "../../components/NavBar_m/NavBar_m";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

const Settings = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <Page bg={"#E5E5EA"}>
         {!isDesktop && <TopNavbar label={"Настройки"} logo={true} br={"0px 0px 11px 11px"}/>}
         <div>
            {/* тут будет основной контейнер*/}
         </div>
         <NavBar_m pageName={"Settings"} newTasksNumber={3}/>
      </Page>
   )
}

export default Settings