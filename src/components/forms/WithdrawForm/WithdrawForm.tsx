import React, {FC, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import {createWithdrawAmountValidator, validateRequiredField} from "../../../utils/validators";
import Button from "../../Button/Button";
import {WithdrawTypes, withdrawTypes} from "../../../pages/Withdraw_m/Withdraw_m";
import {WithdrawPayloadType} from "../../../api/user-api";
import {withdraw} from "../../../redux/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Input, InputWithMask} from "../../Input/Input";
import {ChooseAmount} from "../common/ChooseAmount/ChooseAmount";
import {RootStateType} from "../../../redux/store";
import Preloader from "../../common/Preloader/Preloader";
import {cleanPhoneNumber} from "../../../utils/parseString";

export type WithdrawFormValuesType = {
   wallet: string
   amount: string
}

type WithdrawFormPropsType = {
   type: WithdrawTypes
}

export const WithdrawForm: FC<WithdrawFormPropsType> = ({type,}) => {
   const dispatch = useDispatch()
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)

   const onSubmit = async (values: WithdrawFormValuesType, {resetForm}: FormikValues) => {
      const payload: WithdrawPayloadType = {
         money: +values.amount,
         purse: type === "qiwi" ? cleanPhoneNumber(values.wallet) : values.wallet,
         type: type,
      }
      await dispatch(withdraw(payload))
      resetForm()
   }

   type ActiveBtnType = 100 | 500 | 1000 | 0  // 0 - nobody is selected
   const [activeBtn, setActiveBtn] = useState(0 as ActiveBtnType)
   const amountValidator = createWithdrawAmountValidator(type)

   if (isFetching) return <Preloader/>

   return (
      <Formik
         validate={(values: WithdrawFormValuesType) => {
            if (+values.amount !== activeBtn) {
               setActiveBtn(0)
            }
         }}
         initialValues={{
            wallet: "",
            amount: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, values}) =>
               <Form className={styles.wrapper}>
                  <div className={styles.topBlock}>
                     <div className={styles.label}>
                        {withdrawTypes[type].label}
                     </div>
                     <Field name={"wallet"}
                            validate={validateRequiredField}
                            render={({field, form: {touched, errors}}: FieldProps) => (
                               <div className={styles.input}>
                                  <InputWithMask
                                     {...field}
                                     mod={"blue"}
                                     withdrawType={type}
                                     placeholder={withdrawTypes[type].placeholder as string}
                                     isError={!!(errors.wallet && touched.wallet)}
                                     errorMessage={errors.wallet}
                                  />
                               </div>
                               )}
                  />
                  <ChooseAmount setFieldValue={setFieldValue} amount={values.amount} field={"amount"}/>
                  <Field name={"amount"} validate={amountValidator}>
                     {({
                          field,
                          form: {touched, errors}
                       }: FieldProps) => (
                        <div>
                           <Input
                              mod={"blue"}
                              type={"number"}
                              placeholder={"Ввести свою сумму"}
                              isError={!!(errors.amount && touched.amount)}
                              errorMessage={errors.amount}
                              {...field}
                           />
                        </div>
                     )}
                  </Field>
               </div>
            <div className={styles.submitBtn}>
            <Button type="submit">
            Заказать выплату
            </Button>
            </div>
            </Form>}
      </Formik>
   )
}