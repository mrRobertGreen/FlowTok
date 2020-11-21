import React, {FC} from "react";
import styles from "./styles.module.scss";
import blackMen from "../../../media/icons/black_man.svg";
import greenMen from "../../../media/icons/greenMan.svg";
import redMen from "../../../media/icons/redMan.svg";

export const ArchiveBloggers = () => {
    return (
        <div className={styles.bloggers}>
            <p className={styles.bloggers__title}>Блогеры</p>
            <div className={styles.bloggers__grid}>
                <div className={styles.bloggers__container}>
                    <img src={blackMen} className={styles.mens} alt=""/>
                    <div>
                        <p className={styles.bloggers__num}>1089</p>
                        <p className={styles.bloggers__text}>Всего</p>
                    </div>
                </div>
                <div className={styles.bloggers__container}>
                    <img src={greenMen} className={styles.mens} alt=""/>
                    <div>
                        <p className={styles.bloggers__num}>1089</p>
                        <p className={styles.bloggers__text}>Выполнили</p>
                    </div>
                </div>
                <div className={styles.bloggers__container}>
                    <img src={redMen} className={styles.mens} alt=""/>
                    <div>
                        <p className={styles.bloggers__num}>1089</p>
                        <p className={styles.bloggers__text}>Отменили</p>
                    </div>
                </div>
            </div>
        </div>
    )
}