import React from "react"
import {Page} from "../../components/Page/Page";
import NavBar_m from "../../components/NavBar_m/NavBar_m";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Message} from "../../components/Message/Message";
import {ArchiveCard} from "../../components/Archive/ArchiveCard/ArchiveCard";

export const Archive = () => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop);

    return (
        <Page bg={"#EFEFF4"} isNavbar={true}>
            <TopNavbar label={"Архив"} logo={true} br={"0px 0px 11px 11px"}/>
            <ArchiveCard/>
            <ArchiveCard/>
            <ArchiveCard/>
            {!isDesktop && <NavBar_m newTasksNumber={3} pageName={"Profile"}/>}
            <Message/>
        </Page>
    )
}