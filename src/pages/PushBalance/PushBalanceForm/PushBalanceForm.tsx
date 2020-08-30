import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {createMinSumValidator} from "../../../utils/validators";
import styles from "./styles.module.scss";
import Preloader from "../../../components/common/Preloader/Preloader";
import {Redirect} from "react-router-dom";
import {ChooseAmount} from "../../../components/forms/common/ChooseAmount/ChooseAmount";
import {Input} from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import {pushTaskBalance} from "../../../redux/user/user-reducer";

type PropsType = {
   taskId: string
}

export const PushBalanceForm:FC<PropsType> = ({taskId}) => {
   const dispatch = useDispatch()

   const onSubmit = async (values: { amount: string }, {resetForm}: FormikValues) => {
      await dispatch(pushTaskBalance(+values.amount, taskId))
      setIsSubmit(true)
      resetForm()
   }

   type ActiveBtnType = 100 | 500 | 1000 | 0  // 0 - nobody is selected
   const [activeBtn, setActiveBtn] = useState(0 as ActiveBtnType)
   const [isSubmit, setIsSubmit] = useState(false)
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)
   const validateMinSum = createMinSumValidator(10)

   if (isFetching) return <Preloader/>
   if (isSubmit) return <Redirect to={"/cabinet"}/>

   return (
      <Formik
         validate={(values: { amount: string }) => {
            if (+values.amount !== activeBtn) {
               setActiveBtn(0)
            }
         }}
         initialValues={{
            amount: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, values}) =>
               <Form className={styles.wrapper}>
                  <div>
                     <ChooseAmount setFieldValue={setFieldValue} amount={values.amount} field={"amount"}/>
                     <Field name={"amount"} validate={validateMinSum}>
                        {({field, form: {errors, touched}}: FieldProps) => (
                           <div>
                              <Input placeholder={"Ввести свою сумму"}
                                     type={"number"}
                                     mod={"blue"}
                                     {...field}
                                     isError={!!(errors.amount && touched.amount)}
                                     errorMessage={errors.amount}
                              />
                           </div>
                        )}
                     </Field>
                     <div className={styles.label}>С вашего основного баланса будет
                        списано <span className={styles.amount}>{values.amount ? values.amount : "0"}</span> рублей и
                        перечислено в бюджет данной кампании
                     </div>
                  </div>

                  <div className={styles.submitBtn}>
                     <Button type="submit">
                        Пополнить
                     </Button>
                  </div>
               </Form>}
      </Formik>
   )
}