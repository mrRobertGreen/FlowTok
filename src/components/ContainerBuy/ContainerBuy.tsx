import React, {FC, useState} from "react";
import styles from "./styles.module.scss";
import cross from "../../media/images_new/Cross.svg";
import Button from "../Button/Button";
import {useTranslation} from "react-i18next";
import {MoneyWayT, TakeMoneyWay} from "../Settings/TakeMoneyWay/TakeMoneyWay";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import {validateRequiredField} from "../../utils/validators";
import {Input} from "../Input/Input";
import {Separator} from "../Separator/Separator";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {WithdrawReqBodyT} from "../../api/user-api";
import {withdraw} from "../../redux/user/user-reducer";
import {WithdrawFormValuesType} from "../forms/WithdrawForm/WithdrawForm";

type PropsT = {
    onClose: () => void
    amount: number
}

export const ContainerBuy: FC<PropsT> = ({onClose, amount}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const cy = useSelector((state: RootStateType) => state.app.cy);
    const lang = useSelector((state: RootStateType) => state.app.lang);

    const placeholders = {
        yandex: `Yandex ${t("money-text")}`,
        qiwi: `Qiwi ${t("wallet-text")}`,
        wm: `Webmoney`,
        card: `${t("bank-account-text")}`,
        phone: `${t("phone-number-text")}`,
        crypto: `${t("cryptocurrency-text")}`,
        perfect: "Perfect Money",
        payer: "Payeer",
        free: "Free-Kassa"
    }
    const getPlaceholder = (type: MoneyWayT) => {
        switch (type) {
            case "card": return placeholders.card
            case "wm": return placeholders.wm
            case "qiwi": return placeholders.qiwi
            case "yandex": return placeholders.yandex
            case "crypto": return placeholders.crypto
            case "perfect": return placeholders.perfect
            case "payer": return placeholders.payer
            case "free": return placeholders.free
        }
        return ""
    };
    const onSubmit = (values: WithdrawFormValuesType, {resetForm}: FormikValues) => {
        const payload: WithdrawReqBodyT = {
            cy: cy,
            account: values.account,
            all: +values.money === amount,
            lang: lang,
            money: +values.money,
            type: values.type,
        }
        dispatch(withdraw(payload, onClose))
    };


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className={styles.title}>{t("buy-container-title")}</p>

                <Formik
                    initialValues={{
                        account: "",
                        money: "",
                        type: "" as MoneyWayT
                    }}
                    onSubmit={onSubmit}
                >
                    {
                        ({setFieldValue, values}) =>
                            <Form >
                                <TakeMoneyWay
                                    type={values.type}
                                    setType={(type: MoneyWayT) => setFieldValue("type", type)}/>
                                    <p>{t("sum-text") + ": " + amount}</p>
                                <Button mod={values.money ? "gradient" : "grey"}
                                        children={t("buy-btn")}
                                        m={"15px 0 0 0"}
                                        type="submit"/>
                            </Form>}
                </Formik>
            </div>
        </div>
    )
}