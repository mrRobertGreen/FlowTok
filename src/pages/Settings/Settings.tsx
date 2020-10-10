import React from "react";
import {Page} from "../../components/Page/Page";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import styles from "./styles.module.scss";
import {Card} from "../../components/Card/Card";

const Settings = () => {
    return (
        <Page bg={"#E5E5EA"} isNavbar={true} pageName={"Settings"}>
            <TopNavbar label={"Настройки"} logo={true} br={" 0px 0px 11px 11px"}/>
            <div className={styles.wrapper}>
                <div className={styles.enter}>
                    <p className={styles.enter__text}>Выйти из профиля</p>
                    <button className={styles.enter__btn}>Выйти</button>
                </div>
            </div>
        </Page>
    )
}

export default Settings