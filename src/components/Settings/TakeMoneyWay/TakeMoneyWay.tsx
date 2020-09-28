import React, {FC} from "react";
import styles from "./styles.module.scss";

type PropsT = {

}

export const TakeMoney: FC<PropsT> = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper__item}>
                <button>Yandex.Деньги</button>
            </div>
            <div className={styles.wrapper__item}>
                <button>Yandex.Деньги</button>
            </div>
            <div className={styles.wrapper__item}>
                <button>Yandex.Деньги</button>
            </div>
            <div className={styles.wrapper__item}>
                <button>Yandex.Деньги</button>
            </div>
            <div className={styles.wrapper__item}>
                <button>Yandex.Деньги</button>
            </div>
            <div className={styles.wrapper__item}>
                <button>Yandex.Деньги</button>
            </div>
            <div className={styles.wrapper__item}>
                <button>Yandex.Деньги</button>
            </div>
        </div>
    )
}