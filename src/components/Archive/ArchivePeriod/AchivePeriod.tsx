import React, {FC} from "react";
import styles from "./styles.module.scss";

export const ArchivePeriod = () => {
    return (
        <div className={styles.period}>
            <p className={styles.period__title}>Период</p>
            <div className={styles.period__numbers}>
                <p>11.09.2020 - 27.09.2020</p>
                <p className={styles.spent}> 12 дней</p>
            </div>
        </div>
    )
}