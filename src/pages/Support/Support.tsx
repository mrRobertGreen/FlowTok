import React, {FC} from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useTranslation} from "react-i18next";
import {Page} from "../../components/Page/Page";
import Modal from "../../components/common/Modal/Modal";
import {TicketForm} from "../../components/Support/TicketForm/TicketForm";

export const Support: FC = () => {
    const {t} = useTranslation();

    return (
        <Page>
            <TopNavbar label={t("support-title")} subLabel={t("support-subTitle")}/>
      
        </Page>

    )
}