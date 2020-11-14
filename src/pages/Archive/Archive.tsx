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
            <ArchiveCard
                name={"FlowTok"}
                bloggerCancel={8}
                bloggerDone={1090}
                daysPeriod={12}
                likes={6293} price={25} repost={2492}
                spent={12500} views={12359} period={"11.09.2020 - 27.09.2020"} />
            {!isDesktop && <NavBar_m newTasksNumber={3} pageName={"Profile"}/>}
            <Message/>
        </Page>
    )
}