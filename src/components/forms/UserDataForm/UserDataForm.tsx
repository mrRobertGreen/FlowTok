import React, {FC, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import {validateRequiredField} from "../../../utils/validators";
import Button from "../../Button/Button";
import {WithdrawTypes} from "../../../pages/Withdraw_m/Withdraw_m";
import {useDispatch, useSelector} from "react-redux";
import {ChooseSex, Input, SelectCountry, ToggleSwitch} from "../../Input/Input";
import {RootStateType} from "../../../redux/store";
import Preloader from "../../common/Preloader/Preloader";
import {Separator} from "../../Separator/Separator";

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
                  <div className={styles.block}>
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
                                        placeholder={"Возраст"}
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
                        <div className={styles.btn}>
                           <Button mod={"woman"}>Женский</Button>
                        </div>
                        <div className={styles.btn}>
                           <Button mod={"man"}>Мужской</Button>
                        </div>
                     </div>
                  </div>
                  <div className={styles.row}>
                     <div className={styles.column}>
                        <div className={styles.label}>
                           Включить уведомления в Telegram
                        </div>
                        <div className={styles.subLabel}>
                           1₽ на счет и актуальные задания!
                        </div>
                     </div>
                     <ToggleSwitch/>
                  </div>
                  <Separator m={"0 0 8px"}/>
                  <div className={styles.row}>
                     <div className={styles.column}>
                        <div className={styles.label}>
                           Подтвердите свой аккаунт
                        </div>
                        <div className={styles.subLabel}>
                           Нам нужно удостоверится, что это Ваш аккаунт
                        </div>
                     </div>
                     <div className={styles.submitBtn}>
                        <Button mod={"black"} type={"submit"}>
                           Подвердить
                        </Button>
                     </div>
                  </div>
               </Form>}
      </Formik>
   )
}