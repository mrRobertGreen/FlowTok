import React, {FC, useState} from "react";
import styles from "./styles.module.scss";
import info from "../../media/images_new/Info.svg";
import {Card} from "../Card/Card";
import Button from "../Button/Button";

type PropsType = {
    bank?: number
}

export const OffShore: FC<PropsType> = ({bank}) => {
    if (!bank) return <></>

    return (
        <div className={styles.wrapper}>
            <Card>
                <div className={styles.title}>
                    <p>Оффшорный счет</p>
                    <button style={{backgroundColor:"white"}}>
                        <img src={info} className={styles.title__info} alt=""/>
                    </button>
                </div>
                <div className={styles.label}>
                    Ваш баланс
                </div>
                <div className={styles.sum}>
                    <p className={styles.money}>{bank}</p>
                    <p className={styles.money__green}>+ 1318 ₽</p>
                </div>
                <Button mod={"gradient"}>
                    В кошелек
                </Button>
            </Card>
        </div>
    )
}

