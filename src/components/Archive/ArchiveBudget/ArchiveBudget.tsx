import React, {FC} from "react";
import styles from "./styles.module.scss";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";

export const ArchiveBudget = () => {

    return (
        <div className={styles.budget}>
            <p className={styles.budget__title}>Бюджет</p>
            <div className={styles.budget__numbers}>
                <p>12 500₽</p>
                <p className={styles.spent}>Потрачено</p>
            </div>
            <div className={styles.budget__numbers}>
                <p>25₽</p>
                <p className={styles.spent}>Цена за задание</p>
            </div>
        </div>
    )
}