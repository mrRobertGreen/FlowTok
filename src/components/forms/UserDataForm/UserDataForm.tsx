import React, {FC, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import {validateRequiredField} from "../../../utils/validators";
import Button from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {Input, ToggleSwitch} from "../../Input/Input";
import {RootStateType} from "../../../redux/store";
import {Separator} from "../../Separator/Separator";
import {verify} from "../../../redux/auth/auth-reducer";
import {VerifyPayloadType} from "../../../api/user-api";
import {osName} from "react-device-detect"

export type UserDataFormValuesType = {
   name: string
   age: string
   country: string
   sex: "woman" | "man" | ""
   turnOnTelegram: boolean
}

type PropsType = {}

export const UserDataForm: FC<PropsType> = () => {
   const dispatch = useDispatch()
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   const verifySuccess = useSelector((state: RootStateType) => state.auth.verifySuccess)
   const [isLoading, setIsLoading] = useState(false)

   const onSubmit = async (values: UserDataFormValuesType, {resetForm,}: FormikValues) => {
      const payload: VerifyPayloadType = {
         age: +values.age,
         country: values.country,
         platform: osName,
         sex: values.sex
      }
      dispatch(verify(payload, resetForm, setIsLoading))
   }

   return (
      <Formik
         initialValues={{
            name: "",
            age: "",
            country: "",
            sex: "" as "woman" | "man" | "",
            turnOnTelegram: false as boolean,
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
                                     mod={!errors.name && touched.name ? "active" : undefined}
                                     type={"text"}
                                     placeholder={"Имя"}
                                     isError={!!(errors.name && touched.name)}
                                     errorMessage={errors.name}
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
                                        mod={!errors.age && touched.age ? "active" : undefined}
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
                                        mod={!errors.country && touched.country ? "active" : undefined}
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
                           <Button
                              type={"button"}
                              isActive={values.sex === "woman"}
                              mod={"woman"}
                              onClick={() => setFieldValue("sex", "woman")}>
                              Женский
                           </Button>
                        </div>
                        <div className={styles.btn}>
                           <Button
                              type={"button"}
                              isActive={values.sex === "man"}
                              mod={"man"}
                              onClick={() => setFieldValue("sex", "man")}>
                              Мужской
                           </Button>
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
                     <ToggleSwitch
                        isLabel={values.turnOnTelegram && isDesktop}
                        onClick={() => {setFieldValue("turnOnTelegram", !values.turnOnTelegram)}}/>
                  </div>
                  <Separator m={"0 0 8px"}/>
                  <div className={styles.row}>
                     <div className={styles.column}>
                        <div className={styles.label}>
                           {!verifySuccess && "Подтвердите свой аккаунт"}
                           {verifySuccess && "Аккаунт на стадии проверки"}
                        </div>
                        <div className={styles.subLabel}>
                           {!verifySuccess && "Нам нужно удостоверится, что это Ваш аккаунт"}
                           {verifySuccess && "Вы можете перейти в свой профиль, пока модератор проверяет Ваш аккаунт"}
                        </div>
                     </div>
                     <div className={styles.submitBtn}>
                        <Button
                           mod={isLoading ? "loading" : "black"}
                           type={"submit"}>
                           Подвердить
                        </Button>
                     </div>
                  </div>
               </Form>}
      </Formik>
   )
}