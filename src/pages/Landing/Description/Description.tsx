import React, {FC} from "react";
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";

export const Description: FC = ({}) => {
    const {t} = useTranslation();

    return (
        <div className={styles.wrapper}>
            <p className={styles.description} style={{marginBottom: "14px"}}>{t("description-first-text")}
            </p>
            <p className={styles.description} style={{marginBottom: "14px"}}>{t("description-second-text")}
            </p>
            <p className={styles.description} style={{marginBottom: "76px"}}>{t("description-third-text")}
            </p>

            <div>
                <p className={styles.firm}>LLC TAKE CONTAINER</p>
                <p className={styles.firm}>Bonistraat 9</p>
                <p className={styles.firm} style={{marginBottom:"10px"}}>1094 SH Amsterdam Holland</p>
            </div>
        </div>
    )
}