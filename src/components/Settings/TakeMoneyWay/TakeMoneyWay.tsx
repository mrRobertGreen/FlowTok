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
   | "card_ru"
   | "card_ua"
   | "advcash"
   | "megaphone"
   | "mts"
   | "beeline"
   | "tele2"


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
   } else {
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
                 onClick={() => setType("payer")}>
               <button
                  type={"button"}
                  className={`${styles.wrapper__btn} ${type === "payer" && styles.active}`}>
                  <span className={styles.text}>Payeer</span>
               </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("card_ru")}>
               <button
                  type={"button"}
                  className={`${styles.wrapper__btn} ${type === "card_ru" && styles.active}`}>
                  <span className={styles.text}>{t("bank-account-ru-text")}</span>
               </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("card_ua")}>
               <button
                  type={"button"}
                  className={`${styles.wrapper__btn} ${type === "card_ua" && styles.active}`}>
                  <span className={styles.text}>{t("bank-account-ua-text")}</span>
               </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("advcash")}>
               <button
                  type={"button"}
                  className={`${styles.wrapper__btn} ${type === "advcash" && styles.active}`}>
                  <span className={styles.text}>Advcash</span>
               </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("megaphone")}>
               <button
                  type={"button"}
                  className={`${styles.wrapper__btn} ${type === "megaphone" && styles.active}`}>
                  <span className={styles.text}>Мегафон</span>
               </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("mts")}>
               <button
                  type={"button"}
                  className={`${styles.wrapper__btn} ${type === "mts" && styles.active}`}>
                  <span className={styles.text}>МТС</span>
               </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("beeline")}>
               <button
                  type={"button"}
                  className={`${styles.wrapper__btn} ${type === "beeline" && styles.active}`}>
                  <span className={styles.text}>Билайн</span>
               </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("tele2")}>
               <button
                  type={"button"}
                  className={`${styles.wrapper__btn} ${type === "tele2" && styles.active}`}>
                  <span className={styles.text}>Теле2</span>
               </button>
            </div>
         </div>
      )
   }
}