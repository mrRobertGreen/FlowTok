import React from "react";
import {Page} from "../../components/Page/Page";
import styles from "./styles.module.scss"
import {LoginVideo} from "../../components/LoginVideo/LoginVideo";
import {Logo} from "../../components/Logo/Logo";
import {Entrance} from "../../components/Entrance/Entrance";
import {useTranslation} from "react-i18next";

export const SignIn = () => {
    const {t} = useTranslation();
    return (
        <Page h100={true}>
            <Logo/>
            <LoginVideo/>
            <div className={styles.container}>
                <div className={styles.container__item}>
                    <div className={styles.title}>{t("sign-in-btn")}</div>
                    <div className={styles.column}>
                        <Entrance/>
                    </div>
                </div>
            </div>
        </Page>
    )
}