import React, {FC} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import {validateRequiredField} from "../../../utils/validators";
import Button from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "../../Input/Input";
import {MoneyWayT, TakeMoneyWay} from "../../Settings/TakeMoneyWay/TakeMoneyWay";
import {Separator} from "../../Separator/Separator";
import {withdraw} from "../../../redux/user/user-reducer";
import {WithdrawReqBodyT} from "../../../api/user-api";
import {RootStateType} from "../../../redux/store";
import {useTranslation} from "react-i18next";

export type WithdrawFormValuesType = {
   account: string
   money: string
   type: MoneyWayT
}

type PropsT = {
   balance: number
   onClose: () => void
   isAdd: boolean
}


export const WithdrawForm: FC<PropsT> = ({balance, onClose, isAdd}) => {
   const dispatch = useDispatch()
   const cy = useSelector((state: RootStateType) => state.app.cy)
   const lang = useSelector((state: RootStateType) => state.app.lang)

   const {t} = useTranslation();

   const placeholders = {
      yandex: `Yandex ${t("money-text")}`,
      qiwi: `Qiwi ${t("wallet-text")}`,
      wm: `Webmoney`,
      wmz:"Webmoney Z",
      wmr: "Webmoney R",
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
         case "wmr": return placeholders.wmr
         case "wmz": return placeholders.wmz
      }
      return ""
   }

   const onSubmit = (values: WithdrawFormValuesType, {resetForm}: FormikValues) => {
      const payload: WithdrawReqBodyT = {
         cy: cy,
         account: values.account,
         all: +values.money === balance,
         lang: lang,
         money: +values.money,
         type: values.type,
      }
      dispatch(withdraw(payload, onClose))
   }

   return (
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
               <Form className={styles.wrapper}>
                  <TakeMoneyWay
                     type={values.type}
                     setType={(type: MoneyWayT) => setFieldValue("type", type)} isAdd={isAdd}/>
                  <Field name={"account"}
                         validate={validateRequiredField}
                  >
                     {({
                          field,
                          form: {touched, errors}
                       }: FieldProps) => (
                         isAdd ?  <span /> : <Input
                           mod={"white"}
                           type={"number"}
                           placeholder={t("phone-or-card-textarea") + getPlaceholder(values.type)}
                           isError={!!(errors.account && touched.account)}
                           errorMessage={errors.account}
                           {...field}
                        />
                     )}
                  </Field>
                  <Separator m={"10px 0 16px 0"}/>
                  <div className={styles.balance}>
                     <p className={styles.balance__text}>{t("balance")}</p>
                     <p className={styles.balance__numbers}>{balance}{cy === "RUB" ? "₽" : "$"}</p>
                  </div>
                  <p className={styles.add}>{t("sum-text")}</p>
                  { isAdd ? <span /> :
                  <Button mod={"white"}
                          isActive={+values.money === balance}
                          children={t("all-sum-btn")}
                          onClick={() => setFieldValue("money", balance)}
                          m={"0 0 10px"}
                          type={"button"}/> }
                  <Field name={"money"}>
                     {({
                          field,
                          form: {touched, errors}
                       }: FieldProps) => (
                        <Input
                           mod={"white"}
                           type={"number"}
                           placeholder={t("all-sum-btn")}
                           isError={!!(errors.money && touched.money)}
                           errorMessage={errors.money}
                           {...field}
                        />
                     )}
                  </Field>
                  <Button mod={values.money ? "gradient" : "grey"}
                          children={t("pay-out-btn")}
                          m={"15px 0 0 0"}
                          type="submit"/>
               </Form>}
      </Formik>
   )
}