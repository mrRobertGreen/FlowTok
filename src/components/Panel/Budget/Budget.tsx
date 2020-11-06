import React from "react"
import styles from "./styles.module.scss"

export const Budget = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className={styles.header}>Бюджет</p>
                <div className={styles.grid}>
                    <div className={styles.text_container}>
                        <p className={styles.title}>Потрачено</p>
                        <p className={styles.numbers}>9 550 ₽</p>
                    </div>
                    <div className={styles.text_container}>
                        <p className={styles.title}>Остаток</p>
                        <p className={styles.numbers}>3 190 ₽</p>
                    </div>
                    <div className={styles.text_container}>
                        <p className={styles.title}>За задание</p>
                        <p className={styles.numbers}>25 ₽</p>
                    </div>
                </div>
            </div>
        </div>
    )
}