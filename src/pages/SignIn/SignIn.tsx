import React from "react";
import {Page} from "../../components/Page/Page";
import styles from "./styles.module.scss"
import {LoginVideo} from "../../components/LoginVideo'/LoginVideo";
import {Logo} from "../../components/Logo/Logo";
import {Entrance} from "../../components/Entrance/Entrance";

export const SignIn = () => {

    return (
        <Page h100={true}>
            <Logo/>
            <LoginVideo/>
            <div className={styles.container}>
                <div className={styles.container__item}>
                    <div className={styles.title}>Вход</div>
                    <div className={styles.column}>
                        <Entrance/>
                    </div>
                </div>
            </div>
        </Page>
    )
}