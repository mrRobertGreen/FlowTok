import React, {FC} from "react";
import styles from "./styles.module.scss";
import {Input} from "../Input/Input";
import VerticalLine from "../../media/images_new/VerticalLine.svg";
import percent from "../../media/images_new/conture.svg"
import Button from "../Button/Button";

type PropsT = {

}

//при нажатии на button "Покупка" должно открываться какое-то info

export const Purchase: FC<PropsT> = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <button className={styles.purchase}>Покупка</button>
                <p className={styles.numbers}>15 236.00 ₽</p>
            </div>
            <div>
                <button className={styles.allSum}>На всю сумму</button>
                <Input
                    mod={"white"}
                    type={"text"}
                    placeholder={"Своя сумма"}
                />
            </div>
            <div className={styles.container}>
                <img src={percent} className={styles.image} alt=" "/>
                <img src={VerticalLine} alt="" className={styles.separator}/>
                <div className={styles.text}>
                    <div className={styles.text__little}>Количество</div>
                    <div className={styles.text__large}>{"1шт. + 30%"}</div>
                    <div className={styles.text__little}>{"До 2 штук осталось 70% "}</div>
                </div>
            </div>
            <div className={styles.profitability}>
                <div className={styles.profitability__container}>
                    <p className={styles.text__little}>Доходность</p>
                    <p className={styles.text__large}><span className={styles.greenPercent}>1.2%</span> в день </p>
                </div>
                <button className={styles.profitability__Btn}>Пополнить</button>
            </div>
            <Button mod={"gradient"} children={"Купить"} />
        </div>
    )
}