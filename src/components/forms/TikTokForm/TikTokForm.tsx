import React, {FC, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import {validateRequiredField} from "../../../utils/validators";
import Button from "../../Button/Button";
import {WithdrawTypes} from "../../../pages/Withdraw_m/Withdraw_m";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "../../Input/Input";
import {RootStateType} from "../../../redux/store";
import Preloader from "../../common/Preloader/Preloader";

export type TikTokFormValuesType = {
   link: string
}

type PropsType = {}

export const TikTokForm: FC<PropsType> = () => {
   const dispatch = useDispatch()
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)

   const onSubmit = async (values: TikTokFormValuesType, {resetForm}: FormikValues) => {
      resetForm()
   }

   if (isFetching) return <Preloader/>

   return (
      <Formik
         initialValues={{
            link: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, values}) =>
               <Form className={styles.wrapper}>
                  <Field name={"link"}
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
                     <div className={styles.btn}>
                        <Button type="submit" mod={"white"}>
                           Перейти в TikTok
                        </Button>
                     </div>
                     <div className={styles.submitBtn}>
                        <Button type="submit" mod={"black"}>
                           Подтвердить
                        </Button>
                     </div>
                  </div>
               </Form>}
      </Formik>
   )
}