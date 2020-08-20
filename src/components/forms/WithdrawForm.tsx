import React, {FC, FormEvent, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikProps, FormikValues} from "formik";
import styles from "../Cabinet_mPage/CreateTask/CreateTaskForm/styles.module.scss";
import classNames from "classnames";
import {validateRequiredField} from "../../utils/validators";
import Button from "../Button/Button";
import {WithdrawTypes, withdrawTypes} from "../../pages/Withdraw_m/Withdraw_m";
import MaskedInput from 'react-text-mask'
import {WithdrawPayloadType} from "../../api/user-api";
import {withdraw} from "../../redux/user-reducer";
import {useDispatch} from "react-redux";


type PropsType = {
   withdrawType: WithdrawTypes
   onChange: (e: FormEvent<HTMLInputElement>) => void
   className: string
}

const InputWithMask: FC<PropsType> = ({withdrawType, onChange, className, ...rest}) => {
   debugger
   return <MaskedInput
      mask={withdrawTypes[withdrawType].mask as Array<RegExp | string>}
      placeholder={withdrawTypes[withdrawType].placeholder as string}
      className={className}
      onChange={onChange}
   />
}

type WithdrawFormValuesType = {
   wallet: string
   amount: string
}

type WithdrawFormPropsType = {
   type: WithdrawTypes
}

export const WithdrawForm: FC<WithdrawFormPropsType> = ({type, }) => {
   const dispatch = useDispatch()

   const onSubmit = (values: WithdrawFormValuesType, {resetForm}: FormikValues) => {
      const payload: WithdrawPayloadType = {
         money: +values.amount,
         purse: values.wallet,
         type: type,
      }
      dispatch(withdraw(payload))
      resetForm()
   }

   type ActiveBtnType = 100 | 500 | 1000 | 0  // 0 - nobody is selected
   const [activeBtn, setActiveBtn] = useState(0 as ActiveBtnType)

   return (
      <Formik
         validate={(values: WithdrawFormValuesType) => {
            if (+values.amount !== activeBtn) {
               setActiveBtn(0)
            }
         }}
         initialValues={{
            wallet: "",
            amount: ""
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, errors, touched, handleChange,}) =>

               <Form className={styles.wrapper}>
                  <div>
                     <div className={styles.label}>
                        {withdrawTypes[type].label}
                     </div>
                     <Field name={"wallet"}
                            validate={validateRequiredField}
                            render={(props: FieldProps) => <InputWithMask
                               {...props}
                               onChange={handleChange}
                               withdrawType={type}
                               className={classNames(styles.input, {[styles.error]: errors.wallet && touched.wallet})}
                            />}
                     />
                     <div className={styles.btnGroup}>
                        <div className={classNames(styles.btn, {
                           [styles.activeBtn]: activeBtn === 100,
                        })}
                             onClick={async () => {
                                await setActiveBtn(100)
                                setFieldValue("amount", 100)
                             }}
                        >
                           100₽
                        </div>
                        <div className={classNames(styles.btn, {
                           [styles.activeBtn]: activeBtn === 500,
                        })}
                             onClick={async () => {
                                await setActiveBtn(500)
                                setFieldValue("amount", 500)
                             }}
                        >
                           500₽
                        </div>
                        <div className={classNames(styles.btn, {
                           [styles.activeBtn]: activeBtn === 1000,
                        })}
                             onClick={async () => {
                                await setActiveBtn(1000)
                                setFieldValue("amount", 1000)
                             }}
                        >
                           1000₽
                        </div>
                     </div>
                     <Field name={"amount"}
                            placeholder={"Ввести свою сумму"}
                            type={"number"}
                            validate={validateRequiredField}
                            className={classNames(styles.input, {[styles.error]: errors.amount && touched.amount})}
                     />
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