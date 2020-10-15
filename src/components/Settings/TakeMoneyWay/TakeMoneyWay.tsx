import React, {FC} from "react";
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";

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
                   Yandex.{t("money-text")}
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("qiwi")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "qiwi" && styles.active}`}>
                   Qiwi {t("wallet-text")}
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("wmr")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "wmr" && styles.active}`}>
                   Webmoney R
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("wmz")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "wmz" && styles.active}`}>
                   Webmoney Z
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("card")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "card" && styles.active}`}>
                    {t("bank-account-text")}
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("phone")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "phone" && styles.active}`}>
                    {t("phone-number-text")}
                </button>
            </div>
        </div>
    )
}