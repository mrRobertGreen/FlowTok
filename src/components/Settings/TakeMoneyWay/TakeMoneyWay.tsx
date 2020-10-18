import React, {FC} from "react";
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";
import yandex from "../../../media/images_new/yandex.svg";
import qiwi from "../../../media/images_new/Qiwi.svg";
import webmoney from "../../../media/images_new/Webmoney.svg";
import perfMoney from "../../../media/images_new/PerfectMoney.svg";
import freeKass from "../../../media/images_new/FreeKassa.svg";

export type MoneyWayT =
    "yandex"
    | "qiwi"
    | "wm"
    | "crypto"
    | "card"
    | "phone"
    | "perfect"
    | "payer"
    | "free"
    | "wmr"
    | "wmz"

type PropsT = {
    setType: (type: MoneyWayT) => void
    type: MoneyWayT,
    isAdd: boolean
}

export const TakeMoneyWay: FC<PropsT> = ({setType, type, isAdd}) => {
    const {t} = useTranslation();
    if (isAdd) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapper__item}
                     onClick={() => setType("yandex")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "yandex" && styles.active}`}>
                        <span className={styles.text}>Yandex.{t("money-text")} </span>
                        <img src={yandex} className={styles.icon} alt=""/>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("qiwi")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "qiwi" && styles.active}`}>
                        <span className={styles.text}>Qiwi {t("wallet-text")}</span> <img src={qiwi}
                                                                                          className={styles.icon}
                                                                                          alt=""/>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("wm")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "wm" && styles.active}`}>
                        <span className={styles.text}>Webmoney</span>
                        <img src={webmoney} className={styles.icon} alt=""/>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("crypto")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "crypto" && styles.active}`}>
                        <span className={styles.text}>{t("cryptocurrency-text")}</span>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("card")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "card" && styles.active}`}>
                        <span className={styles.text}>{t("bank-account-text")} </span>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("phone")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "phone" && styles.active}`}>
                        <span className={styles.text}>{t("phone-number-text")} </span>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("perfect")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "perfect" && styles.active}`}>
                        <span className={styles.text}>Perfect Money </span> <img src={perfMoney} className={styles.icon}
                                                                                 alt=""/>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("payer")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "payer" && styles.active}`}>
                        <span className={styles.text}>Payeer </span>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("free")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "free" && styles.active}`}>
                        <span className={styles.text}>Free-Kassa </span> <img src={freeKass} className={styles.icon}
                                                                              alt=""/>
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapper__item}
                     onClick={() => setType("yandex")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "yandex" && styles.active}`}>
                        <span className={styles.text}>Yandex.{t("money-text")} </span>
                        <img src={yandex} className={styles.icon} alt=""/>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("qiwi")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "qiwi" && styles.active}`}>
                        <span className={styles.text}>Qiwi {t("wallet-text")}</span> <img src={qiwi}
                                                                                          className={styles.icon}
                                                                                          alt=""/>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("wmr")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "wmr" && styles.active}`}>
                        <span className={styles.text}>Webmoney R</span>
                        <img src={webmoney} className={styles.icon} alt=""/>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("wmz")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "wmz" && styles.active}`}>
                        <span className={styles.text}>Webmoney Z</span>
                        <img src={webmoney} className={styles.icon} alt=""/>
                    </button>
                </div>

                <div className={styles.wrapper__item}
                     onClick={() => setType("card")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "card" && styles.active}`}>
                        <span className={styles.text}>{t("bank-account-text")} </span>
                    </button>
                </div>
                <div className={styles.wrapper__item}
                     onClick={() => setType("phone")}>
                    <button
                        type={"button"}
                        className={`${styles.wrapper__btn} ${type === "phone" && styles.active}`}>
                        <span className={styles.text}>{t("phone-number-text")} </span>
                    </button>
                </div>
            </div>
        )
    }
}