import React from "react";
import styles from "./styles.module.scss";
import manPic from "../../../media/icons/firstCompany.svg"
import Button from "../../Button/Button";

export const FirstCompany = () => {
    return (
        <div className={styles.wrapper}>
            <img src={manPic} alt=""/>
            <div className={styles.text}>
                <p className={styles.title}>Первая рекламная компания</p>
                <p className={styles.create}>Создайте свою первую рекламную компанию на FlowTok AdStudio</p>
            </div>
            <div className={styles.button}>
                <Button mod={"black"} br={"24px"}>Создать</Button>
            </div>
        </div>
    )
}