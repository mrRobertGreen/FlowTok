import React, {FC, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import {validateRequiredField} from "../../../utils/validators";
import Button from "../../Button/Button";
import {WithdrawTypes} from "../../../pages/Withdraw_m/Withdraw_m";
import {useDispatch, useSelector} from "react-redux";
import {ChooseSex, Input, SelectCountry} from "../../Input/Input";
import {RootStateType} from "../../../redux/store";
import Preloader from "../../common/Preloader/Preloader";

export type TikTokFormValuesType = {
   name: string
   age: string
   country: string
   sex: string
   turnOnTelegram: boolean
}

type PropsType = {}

export const UserDataForm: FC<PropsType> = () => {
   const dispatch = useDispatch()
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)

   const onSubmit = async (values: TikTokFormValuesType, {resetForm}: FormikValues) => {
      resetForm()
   }

   if (isFetching) return <Preloader/>

   return (
      <Formik
         initialValues={{
            name: "",
            age: "",
            country: "",
            sex: "",
            turnOnTelegram: false,
         }}
         validateOnChange={false}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, values}) =>
               <Form className={styles.wrapper}>
                  <Field name={"name"}
                         validate={validateRequiredField}
                         render={({field, form: {touched, errors}}: FieldProps) => (
                            <div className={styles.input}>
                               <Input
                                  mod={"active"}
                                  type={"text"}
                                  placeholder={"Вставьте ссылку"}
                                  isError={!!(errors.link && touched.link)}
                                  errorMessage={errors.link}
                                  {...field}
                               />
                            </div>
                         )}
                  />
                  <div className={styles.row}>
                     <Field name={"age"}
                            validate={validateRequiredField}
                            render={({field, form: {touched, errors}}: FieldProps) => (
                               <div className={styles.input}>
                                  <Input
                                     mod={!!(errors.country) ? undefined : "active"}
                                     type={"number"}
                                     placeholder={"Вставьте ссылку"}
                                     isError={!!(errors.age && touched.age)}
                                     errorMessage={errors.age}
                                     {...field}
                                  />
                               </div>
                            )}
                     />
                     <Field name={"country"}
                            validate={validateRequiredField}
                            render={({field, form: {touched, errors}}: FieldProps) => (
                               <div className={styles.input}>
                                  <Input
                                     mod={!!(errors.country) ? undefined : "active"}
                                     type={"text"}
                                     placeholder={"Страна"}
                                     isError={!!(errors.country && touched.country)}
                                     errorMessage={errors.country}
                                     {...field}
                                  />
                               </div>
                            )}
                     />
                  </div>
                  <div className={styles.row}>

                  </div>
               </Form>}
      </Formik>
   )
}