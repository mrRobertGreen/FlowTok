import React from "react"
import {Page} from "../../components/Page/Page";
import NavBar_m from "../../components/NavBar_m/NavBar_m";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {FirstCompany} from "../../components/Panel/FirstCompany/FirstCompany";
import {Balance} from "../../components/Panel/Balance/Balance";
import {Separator} from "../../components/Separator/Separator";
import {Blogers} from "../../components/Panel/Blogers/Blogers";
import {Budget} from "../../components/Panel/Budget/Budget";
import {Message} from "../../components/Message/Message";
import {Stats} from "../../components/Panel/Stats/Stats";
import {Period} from "../../components/Panel/Period/Period";
import {Campaigns} from "../../components/Panel/Campaigns/Campaigns";

export const Panel = () => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop);
    let isFirst = false; // если еще нет компаний, то true

    return (
        <Page bg={"#EFEFF4"} isNavbar={true}>
            <TopNavbar label={"Панель"} logo={true} br={"0px 0px 11px 11px"}/>
            {!isDesktop && <div>
                <Separator m={"0"}/>
                <Balance/>
            </div>}
            <Message/>
            {!isDesktop && <NavBar_m newTasksNumber={3} pageName={"Profile"}/>}
            {isFirst ?
                <FirstCompany/> :
                <div>
                    <Blogers/>
                    <Budget/>
                    <Campaigns />
                    <Stats/>
                    <Period/>
                </div>}
        </Page>
    )
}