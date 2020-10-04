import React, {FC} from "react";
import styles from "./styles.module.scss"

export type PropsType = {
    label: string
    value: number
    pad?: string
}

const MiniCard: FC<PropsType> = ({label, value, pad}) => {

    return (
        <div data-test={"wrapper"} className={styles.wrapper}>
            <div className={styles.label}>
                {label}
            </div>
            <div className={styles.money}>
                {value}₽
                <p className={styles.profit}>+1380₽</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.column}>
                    <p className={styles.size}>Small</p>
                    <p className={styles.money_2}>12 359 ₽</p>
                    <p className={styles.profit}>+1380₽</p>
                </div>
                <div className={styles.column}>
                    <p className={styles.size}>Large</p>
                    <p className={styles.money_2}>12 359 ₽</p>
                    <p className={styles.profit}>+1380₽</p>
                </div>
                <div className={styles.column}>
                    <p className={styles.size}>Холодильник</p>
                    <p className={styles.money_2}>12 359 ₽</p>
                    <p className={styles.profit}>+1380₽</p>
                </div>
            </div>
        </div>
    )
}

export default MiniCard