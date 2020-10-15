import React, {FC} from "react";
import styles from "./styles.module.scss";

export type MoneyWayT = "yandex" | "qiwi" | "wmr" | "wmz" | "card" | "phone"

type PropsT = {
   setType: (type: MoneyWayT) => void
   type: MoneyWayT
}

export const TakeMoneyWay: FC<PropsT> = ({setType, type}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper__item}
                 onClick={() => setType("yandex")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "yandex" && styles.active}`}>
                   Yandex.Деньги
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("qiwi")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "qiwi" && styles.active}`}>
                   Qiwi кошелек
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
                   Банковская карта
                </button>
            </div>
            <div className={styles.wrapper__item}
                 onClick={() => setType("phone")}>
                <button
                   type={"button"}
                   className={`${styles.wrapper__btn} ${type === "phone" && styles.active}`}>
                   Номер телефона
                </button>
            </div>
        </div>
    )
}