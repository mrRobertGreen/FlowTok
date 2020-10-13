import React, {FC} from "react";
import styles from "./styles.module.scss";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {useTranslation} from "react-i18next";

export const Support: FC = () => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop);
    const {t} = useTranslation();

    return (
        <div>
            <TopNavbar label={t("support-title")}/>
            <div className={styles.info}>
                <p>Официальный новостной канал: <a href="https://t.me/flowtok" target="_blank"
                                                   rel="noopener noreferrer">flowtok</a></p>
                <br/>
                <p>По всем вопросам обращаться в службу поддержки</p>
                <p>Почта: <a href="https://flowtokcom@gmail.com" target="_blank"
                             rel="noopener noreferrer">flowtokcom@gmail.com</a></p>
                <p>Телеграм: <a href="https://t.me/flowtokcom" target="_blank" rel="noopener noreferrer">flowtokcom</a>
                </p>
            </div>
        </div>

    )
}