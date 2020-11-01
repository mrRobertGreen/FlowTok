import React from "react"
import {Page} from "../../components/Page/Page";
import NavBar_m from "../../components/NavBar_m/NavBar_m";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {FirstCompany} from "../../components/Panel/FirstCompany/FirstCompany";
import {Balance} from "../../components/Panel/Balance/Balance";
import {Separator} from "../../components/Separator/Separator";

export const Panel = () => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop);
    let isFirst = true; // если еще нет компаний, то true

    return (
        <Page bg={"#EFEFF4"} isNavbar={true}>
            <TopNavbar label={"Панель"} logo={true} br={"0px 0px 11px 11px"}/>
            {!isDesktop && <div>
                <Separator m={"0"}/>
                <Balance/>
            </div>}
            {!isDesktop && <NavBar_m newTasksNumber={3} pageName={"Profile"}/>}
            {isFirst ?
                <FirstCompany/> :
                <div></div>}
        </Page>
    )
}