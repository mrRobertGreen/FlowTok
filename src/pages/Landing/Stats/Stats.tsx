import React, {FC} from "react";
import styles from "./styles.module.scss";

/*
* Тут все изи, делай через justify-content: space-around
*
* Дробить тут на компоненты или нет - твое дело
* */

export const Stats: FC = () => {
    // ...
    // Здесь будут хуки которые достают из state данные статистики.
    // Пока что вставляй фейковые данные.

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className={styles.bold}>
                    563 195
                </p>
                <p className={styles.little}>
                    Пользователей в FlowTok
                </p>
            </div>
            <div className={styles.container}>
                <p className={styles.bold}>
                    28 159 789 ₽
                </p>
                <p className={styles.little}>
                    Всего выплачено
                </p>
            </div>
            <div className={styles.container}>
                <p className={styles.bold}>
                    1 578 ₽
                </p>
                <p className={styles.little}>
                    Средний доход в день
                </p>
            </div >
        </div>
    )
}