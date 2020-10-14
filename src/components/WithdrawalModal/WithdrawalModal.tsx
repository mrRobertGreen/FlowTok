import React, {FC, useState} from "react";
import styles from "./styles.module.scss";
import {TakeMoney} from "../Settings/TakeMoneyWay/TakeMoneyWay";
import cross from "../../media/images_new/Cross.svg";
import {Field, FieldProps, Form} from "formik";
import {validateRequiredField} from "../../utils/validators";
import {Input} from "../Input/Input";
import {useTranslation} from "react-i18next";
import {Separator} from "../Separator/Separator";
import Button from "../Button/Button";

type PropsT = {
    balance?: number
}

export const WithdrawalModal: FC<PropsT> = ({balance}) => {
    const {t} = useTranslation();
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p className={styles.title}>Вывод средств</p>
                <button style={{backgroundColor: "white"}} className={styles.cross}>
                    <img src={cross} alt=""/>
                </button>
            </div>
            <p className={styles.add}>Добавить</p>

            <TakeMoney/>
            {/*удачное место для формы*/}
            <Separator m={"0 0 16px 0"}/>
            <div className={styles.balance}>
                <p className={styles.balance__text}>Ваш баланс</p>
                <p className={styles.balance__numbers}>{balance + " ₽"}</p>
            </div>
            <p className={styles.add}>Сумма</p>
            <Button mod={"white"} children={"Вся сумма"}/>
            {/*еще более удачное место для формы*/}
            {(isSumExist:boolean = false) =>
            isSumExist ?  <Button mod={"gradient"} children={"Выплатить"} m={"15px 0 0 0"}/> : <Button mod={"grey"} children={"Выплатить"} m={"15px 0 0 0"} />}
        </div>
    )
}