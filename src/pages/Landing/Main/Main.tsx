import React, {FC} from "react";
import styles from "./styles.module.scss";
import {NavLink} from "react-router-dom";
import Button from "../../../components/Button/Button";
import {MainPicture} from "../../../components/MainPicture/MainPicture"
import {useTranslation} from "react-i18next";

export const Main: FC = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.mainText}>
                    <div className={styles.mainText__earn}>
                        <p>{t("earn-money-title")}</p>
                    </div>
                    <div className={styles.mainText__content}>
                        <p>{t("invest-text")}</p>
                    </div>
                    <div className={styles.buttons}>
                        <NavLink to={"/reg"}>
                            <div className={styles.mainText__createBtn}>
                                <Button mod={"gradient"} children={t("create-acc-btn")} br={"42px"}/>
                            </div>
                        </NavLink>
                        <NavLink to={"/login"}>
                            <div>
                                <button className={styles.In}>{t("sign-in-btn")}</button>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={styles.mainPic}>
                <MainPicture isDesktop={true}/>
            </div>
        </div>
    )
}