import React, {FC} from "react";
import styles from "./styles.module.scss";
import cross from "../../media/images_new/Cross.svg";
import {ContainerT} from "../../redux/user/user-reducer";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";

type PropsT = {
    onClose: () => void,
    isRef?: boolean
}


export const ToolTip: FC<PropsT> = ({onClose, isRef}) => {

    // @ts-ignore
    const {type} = useParams() as ContainerT;
    const {t} = useTranslation();

    if (isRef) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.headerContainer}>
                    <p className={styles.header}>{t("referral-title")}</p>
                    <button className={styles.crossBtn} onClick={onClose}><img src={cross}
                                                                               style={{width: "12px"}}
                                                                               alt=""/></button>
                </div>
                <p className={styles.text}>{t("ref-1-text")}</p>
                <p className={styles.text}>{t("ref-2-text")}</p>
                <p className={styles.text}>{t("ref-3-text")}</p>
                <p className={styles.text}>{t("ref-4-text")}</p>
                <p className={styles.percent_header}>{t("percent-title")}</p>
                <p className={styles.text}>{t("level-1-text")}</p>
                <p className={styles.text}>{t("level-2-text")}</p>
                <p className={styles.text}>{t("level-3-text")}</p>
                <p className={styles.text}>{t("level-4-text")}</p>
                <p className={styles.text}>{t("level-5-text")}</p>
            </div>
        )
    } else {

        switch (type) {
            case "small":
                return (
                    <div className={styles.wrapper}>
                        <div className={styles.headerContainer}>
                            <p className={styles.header}>{t("container-small-title")}</p>
                            <button className={styles.crossBtn} onClick={onClose}><img src={cross}
                                                                                       style={{width: "12px"}}
                                                                                       alt=""/></button>
                        </div>
                        <p className={styles.text}>{t("small-height-text")}</p>
                        <p className={styles.text}>{t("small-length-text")}</p>
                        <p className={styles.text}>{t("small-width-text")}</p>
                        <p className={styles.text}>{t("small-opening-height-text")}</p>
                        <p className={styles.text}>{t("small-opening-height-text")}</p>
                    </div>
                )
            case "large":
                return (
                    <div className={styles.wrapper}>
                        <div className={styles.headerContainer}>
                            <p className={styles.header}>{t("container-large-title")}</p>
                            <button className={styles.crossBtn} onClick={onClose}><img src={cross} alt=""/></button>
                        </div>
                        <p className={styles.text}>{t("large-height-text")}</p>
                        <p className={styles.text}>{t("large-length-text")}</p>
                        <p className={styles.text}>{t("large-width-text")}</p>
                        <p className={styles.text}>{t("large-opening-height-text")}</p>
                        <p className={styles.text}>{t("large-opening-height-text")}</p>
                    </div>
                )
            case "refrigerator":
                return (
                    <div className={styles.wrapper}>
                        <div className={styles.headerContainer}>
                            <p className={styles.header}>{t("refrigerator-title")}</p>
                            <button className={styles.crossBtn} onClick={onClose}><img src={cross} alt=""/></button>
                        </div>
                        <p className={styles.text}>{t("compressor-text")}</p>
                        <p className={styles.text}>{t("large-height-text")}</p>
                        <p className={styles.text}>{t("large-length-text")}</p>
                        <p className={styles.text}>{t("large-width-text")}</p>
                    </div>
                )
            default:
                return (
                    <div className={styles.wrapper}>
                        <div className={styles.headerContainer}>
                            <p className={styles.header}>{t("offshore-account-title")}</p>
                            <button className={styles.crossBtn} onClick={onClose}><img src={cross} alt=""/></button>
                        </div>
                        <p className={styles.text}>{t("your-bill-text")}</p>
                    </div>
                )
        }
    }
}