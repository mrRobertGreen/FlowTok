import React, {FC} from "react";
import styles from "./styles.module.scss"
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useTranslation} from "react-i18next";
import {Page} from "../../components/Page/Page";
import {TicketList} from "../../components/Support/TicketList/TicketList";



export const Support: FC = () => {
    const {t} = useTranslation();

    return (
        <Page bg={"#E5E5EA"}>
            <TopNavbar label={t("support-title")} subLabel={t("support-subTitle")}/>

            <div className={styles.wrapper}>
                <TicketList />
            </div>
        </Page>

    )
}