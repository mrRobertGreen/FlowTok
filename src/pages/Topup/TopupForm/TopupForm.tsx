import React, {FC, useState} from "react";
import {sha256} from "js-sha256";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {createMinSumValidator} from "../../../utils/validators";
import {Redirect} from "react-router-dom";
import {ChooseAmount} from "../../../components/forms/common/ChooseAmount/ChooseAmount";
import {Input} from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Preloader from "../../../components/common/Preloader/Preloader";
import styles from "./styles.module.scss"

type PropsType = {}

export const TopupForm: FC<PropsType> = () => {
   const callback = (amount: number) => {
      const token = localStorage.getItem("token");
      if (amount !== 0) {
         let desc = "Пополнение";
         let account = token
         let sha = sha256(`${account}{up}${desc}{up}${amount}{up}d4ebb2dbaf23d5ef7089da19236d3986`);
         window.location.href = `https://unitpay.ru/pay/310431-23184/card?sum=${amount}&account=${account}&desc=${desc}&signature=${sha}&код_системы=card`;
         setIsSubmit(true)
      } else {
         alert("Введите правильную сумму");
      }
   }

   const onSubmit = async (values: { value: string }, {resetForm}: FormikValues) => {
      await callback(+values.value)
      resetForm()
   }

   type ActiveBtnType = 100 | 500 | 1000 | 0  // 0 - nobody is selected
   const [activeBtn, setActiveBtn] = useState(0 as ActiveBtnType)
   const [isSubmit, setIsSubmit] = useState(false)
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)
   const validateMinSum = createMinSumValidator(100)

   return (
      <Formik
         validate={(values: { value: string }) => {
            if (+values.value !== activeBtn) {
               setActiveBtn(0)
            }
         }}
         initialValues={{
            value: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, values}) =>
               <Form className={styles.wrapper}>
                  {isFetching && <Preloader/>}
                  {isSubmit && <Redirect to={"/cabinet"}/>}
                  <div>
                     <ChooseAmount setFieldValue={setFieldValue} amount={values.value} field={"value"}/>
                     <Field name={"value"} validate={validateMinSum}>
                        {({field, form: {errors, touched}}: FieldProps) => (
                           <div>
                              <Input placeholder={"Ввести свою сумму"}
                                     type={"number"}
                                     mod={"blue"}
                                     {...field}
                                     isError={!!(errors.value && touched.value)}
                                     errorMessage={errors.value}
                              />
                           </div>
                        )}
                     </Field>

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