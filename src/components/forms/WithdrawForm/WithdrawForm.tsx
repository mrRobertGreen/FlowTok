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

export type WithdrawFormValuesType = {
   account: string
   money: string
   type: MoneyWayT
}

type PropsT = {
   balance: number
   onClose: () => void
}

export const WithdrawForm: FC<PropsT> = ({balance, onClose}) => {
   const dispatch = useDispatch()
   const cy = useSelector((state: RootStateType) => state.app.cy)
   const lang = useSelector((state: RootStateType) => state.app.lang)

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
                     setType={(type: MoneyWayT) => setFieldValue("type", type)}/>
                  <Field name={"account"}
                         validate={validateRequiredField}
                  >
                     {({
                          field,
                          form: {touched, errors}
                       }: FieldProps) => (
                        <Input
                           mod={"white"}
                           type={"number"}
                           placeholder={"Введите номер телефона или карты"}
                           isError={!!(errors.account && touched.account)}
                           errorMessage={errors.account}
                           {...field}
                        />
                     )}
                  </Field>
                  <Separator m={"10px 0 16px 0"}/>
                  <div className={styles.balance}>
                     <p className={styles.balance__text}>Ваш баланс</p>
                     <p className={styles.balance__numbers}>{balance}{cy === "RUB" ? "₽" : "$"}</p>
                  </div>
                  <p className={styles.add}>Сумма</p>
                  <Button mod={"white"}
                          isActive={+values.money === balance}
                          children={"Вся сумма"}
                          onClick={() => setFieldValue("money", balance)}
                          m={"0 0 10px"}
                          type={"button"}/>
                  <Field name={"money"}>
                     {({
                          field,
                          form: {touched, errors}
                       }: FieldProps) => (
                        <Input
                           mod={"white"}
                           type={"number"}
                           placeholder={"Ввести свою сумму"}
                           isError={!!(errors.money && touched.money)}
                           errorMessage={errors.money}
                           {...field}
                        />
                     )}
                  </Field>
                  <Button mod={values.money ? "gradient" : "grey"}
                          children={"Выплатить"}
                          m={"15px 0 0 0"}
                          type="submit"/>
               </Form>}
      </Formik>
   )
}