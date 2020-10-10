import React from "react";
import {Page} from "../../components/Page/Page";
import TopNavbar from "../../components/TopNavbar/TopNavbar";

const Settings = () => {
    return (
        <Page bg={"#E5E5EA"} isNavbar={true} pageName={"Settings"}>
            <TopNavbar label={"Настройки"} logo={true} br={" 0px 0px 11px 11px"}/>
        </Page>
    )
}

export default Settings