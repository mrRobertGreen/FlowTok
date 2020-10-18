import React, {FC} from "react";
import styles from "./styles.module.scss";
import cross from "../../media/images_new/Cross.svg";
import Button from "../Button/Button";
import {useTranslation} from "react-i18next";
import {MoneyWayT, TakeMoneyWay} from "../Settings/TakeMoneyWay/TakeMoneyWay";
import {Form, Formik, FormikValues} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {WithdrawFormValuesType} from "../forms/WithdrawForm/WithdrawForm";

type PropsT = {
    onClose: () => void
    isAdd: boolean
}

export const ContainerBuy: FC<PropsT> = ({onClose, isAdd}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const cy = useSelector((state: RootStateType) => state.app.cy);
    const lang = useSelector((state: RootStateType) => state.app.lang);


    const onSubmit = (values: WithdrawFormValuesType, {resetForm}: FormikValues) => {

    };


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <button className={styles.cross} onClick={onClose}>
                    <img src={cross}  alt=""/>
                </button>
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
                                    setType={(type: MoneyWayT) => setFieldValue("type", type)} isAdd={isAdd}/>
                                    <p className={styles.text}>{t("sum-text") + ": 1.5$"}</p>
                                <Button mod={values.type ? "gradient" : "grey"}
                                        children={t("buy-btn")}
                                        m={"15px 0 0 0"}
                                        type="submit"/>
                            </Form>}
                </Formik>
            </div>
        </div>
    )
}