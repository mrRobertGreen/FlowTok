import React, {FC} from "react";
import styles from "./styles.module.scss";

type PropsT = {

}

export const TakeMoney: FC<PropsT> = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper__item}>
                <button className={styles.wrapper__btn}>Yandex.Деньги</button>
            </div>
            <div className={styles.wrapper__item}>
                <button className={styles.wrapper__btn}>Qiwi кошелек</button>
            </div>
            <div className={styles.wrapper__item}>
                <button className={styles.wrapper__btn}>Webmoney R</button>
            </div>
            <div className={styles.wrapper__item}>
                <button className={styles.wrapper__btn}>Webmoney Z</button>
            </div>
            <div className={styles.wrapper__item}>
                <button className={styles.wrapper__btn}>Банковская карта</button>
            </div>
            <div className={styles.wrapper__item}>
                <button className={styles.wrapper__btn}>Номер телефона</button>
            </div>
        </div>
    )
}