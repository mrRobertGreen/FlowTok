import React, {FC} from "react";
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";
import yandex from "../../../media/images_new/yandex.svg";
import qiwi from "../../../media/images_new/Qiwi.svg";
import webmoney from "../../../media/images_new/Webmoney.svg";
import perfMoney from "../../../media/images_new/PerfectMoney.svg";
import freeKass from "../../../media/images_new/FreeKassa.svg";
export type MoneyWayT = "yandex" | "qiwi" | "wmr" | "wmz" | "card" | "phone"

type PropsT = {
   setType: (type: MoneyWayT) => void
   type: MoneyWayT
}

export const TakeMoneyWay: FC<PropsT> = ({setType, type}) => {
    const {t} = useTranslation();
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
                    <span className={styles.text}>Qiwi {t("wallet-text")}</span> <img src={qiwi} className={styles.icon} alt=""/>
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("wmr")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "wmr" && styles.active}`}>
                    <span className={styles.text}>Webmoney</span>
                    <img src={webmoney} className={styles.icon} alt=""/>
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("wmr")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "wmr" && styles.active}`}>
                    <span className={styles.text}>Криптовалюты</span>
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
                 onClick={() => setType("phone")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "phone" && styles.active}`}>
                    <span className={styles.text}>Perfect Mone </span> <img src={perfMoney} className={styles.icon} alt=""/>
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("phone")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "phone" && styles.active}`}>
                    <span className={styles.text}>Payeer </span>
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("phone")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "phone" && styles.active}`}>
                    <span className={styles.text}>Free-Kas </span> <img src={freeKass}  className={styles.icon} alt=""/>
                </button>
            </div>
        </div>
    )
}