import React, {FC} from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useTranslation} from "react-i18next";
import {Page} from "../../components/Page/Page";

export const Support: FC = () => {
    const {t} = useTranslation();

    return (
        <Page>
            <TopNavbar label={t("support-title")} subLabel={t("support-subTitle")}/>

        </Page>

    )
}