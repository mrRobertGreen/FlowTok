import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.scss"
import Button from "../../Button/Button";
import {Separator} from "../../Separator/Separator";

export const TicketList: FC = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.wrapper}>
            <div className={styles.appeal}>
                <p className={styles.appeal__title}>{t("your-appeal-title")}</p>
            </div>
            <div className={styles.columns}>
                <div className={styles.title_container}>
                    <p className={styles.columns__title}>{t("theme-text")}</p>
                    <p className={styles.columns__title}>{t("message-text")}</p>
                    <p className={styles.columns__title}>{t("status-text")}</p>
                </div>
                <div className={styles.main}>
                    {/*Это код для map*/}
                    <div className={styles.ticket_container}>
                        <p className={styles.theme}>Не выводят...</p>
                        <p className={styles.message_count}>4</p>
                        <p className={styles.status}>Закрыт</p>
                    </div>
                    <Separator m={"10px"}/>
                    {/*//*/}
                </div>
            </div>
            <div className={styles.button}>
                <Button mod={"gradient"} children={t("create-ticket-btn")}/>
            </div>
        </div>

    )
}