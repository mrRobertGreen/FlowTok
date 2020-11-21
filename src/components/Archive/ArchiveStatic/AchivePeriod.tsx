import React, {FC} from "react";
import styles from "./styles.module.scss";

export const ArchiveStatic = () => {
    return (
        <div className={styles.stat}>
            <p className={styles.stat__title}>Статистика</p>
            <div className={styles.stat__container}>
                <div className={styles.stat__numbers}>
                    <div className={styles.point1}></div>
                    <div className={styles.text}>
                        <p className={styles.text__numbers}>12359</p>
                        <p className={styles.text__category}>Просмотры</p>
                    </div>
                </div>
                <div className={styles.stat__numbers}>
                    <div className={styles.point2}></div>
                    <div className={styles.text}>
                        <p className={styles.text__numbers}>12359</p>
                        <p className={styles.text__category}>Лайки</p>
                    </div>
                </div>
                <div className={styles.stat__numbers}>
                    <div className={styles.point3}></div>
                    <div className={styles.text}>
                        <p className={styles.text__numbers}>12359</p>
                        <p className={styles.text__category}>Репосты</p>
                    </div>
                </div>
            </div>
        </div>
    )
}