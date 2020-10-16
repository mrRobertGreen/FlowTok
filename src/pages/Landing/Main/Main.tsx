import React, {FC} from "react";
import styles from "./styles.module.scss";
import {NavLink} from "react-router-dom";
import Button from "../../../components/Button/Button";
import {MainPicture} from "../../../components/MainPicture/MainPicture"
import {useTranslation} from "react-i18next";
import mainPic from "../../../media/images_new/Port.jpg";

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
                </div>
            </div>
            <p className={styles.description} style={{marginBottom: "14px"}}>{t("description-first-text")}
            </p>
            <p className={styles.description} style={{marginBottom: "14px"}}>{t("description-second-text")}
            </p>
            <p className={styles.description} style={{marginBottom: "35px"}}>{t("description-third-text")}
            </p>
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

            {/*<div className={styles.mainPic}>*/}
            {/*    <MainPicture isDesktop={true}/>*/}
            {/*</div>*/}
            <div className={styles.mainPic}><span> </span>
                {/*<img src={mainPic} alt="" className={styles.img} width={"100%"}/>*/}
            </div>
        </div>
    )
}