import React, {FC, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import {createMinLengthValidator, emailValidator, validateRequiredField} from "../../../utils/validators";
import Button from "../../Button/Button";
import {WithdrawTypes} from "../../../pages/Withdraw_m/Withdraw_m";
import {useDispatch, useSelector} from "react-redux";
import {ChooseSex, Input, SelectCountry, ToggleSwitch} from "../../Input/Input";
import {RootStateType} from "../../../redux/store";
import Preloader from "../../common/Preloader/Preloader";
import {Separator} from "../../Separator/Separator";
import {sendMoreInfo, verify} from "../../../redux/auth/auth-reducer";
import {VerifyPayloadType} from "../../../api/user-api";
import {osName} from "react-device-detect"
import {SendMoreInfoReqPayloadT} from "../../../api/auth-api";
import {useRedirect} from "../../../hooks/useRedirect";

export type RegFormValuesType = {
   ogrn: string
   inn: string
   name: string
}

type PropsType = {}

export const RegForm: FC<PropsType> = () => {
   const dispatch = useDispatch()
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)
   const [isLoading, setIsLoading] = useState(false)

   useRedirect(isAuth, "/profile")

   const onSubmit = async (values: RegFormValuesType, {resetForm,}: FormikValues) => {
      const payload: SendMoreInfoReqPayloadT = {
         inn: values.inn,
         name: values.name,
         ogrn: values.ogrn
      }
      dispatch(sendMoreInfo(payload, resetForm, setIsLoading))
   }

   return (
      <Formik
         initialValues={{
            ogrn: "",
            inn: "",
            name: ""
         }}
         validateOnChange={false}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, values}) =>
               <Form className={styles.wrapper}>
                  <div className={styles.block}>
                     <Field name={"ogrn"}
                            validate={validateRequiredField}
                            render={({field, form: {touched, errors}}: FieldProps) => (
                               <div className={styles.input}>
                                  <Input
                                     mod={!errors.ogrn && touched.ogrn ? "active" : undefined}
                                     type={"number"}
                                     placeholder={"ОГРН"}
                                     isError={!!(errors.ogrn && touched.ogrn)}
                                     errorMessage={errors.ogrn}
                                     {...field}
                                  />
                               </div>
                            )}
                     />
                     <Field name={"inn"}
                            validate={validateRequiredField}
                            render={({field, form: {touched, errors}}: FieldProps) => (
                               <div className={styles.input}>
                                  <Input
                                     mod={!errors.inn && touched.inn ? "active" : undefined}
                                     type={"number"}
                                     placeholder={"ИНН"}
                                     isError={!!(errors.inn && touched.inn)}
                                     errorMessage={errors.inn}
                                     {...field}
                                  />
                               </div>
                            )}
                     />
                     <Field name={"name"}
                            validate={validateRequiredField}
                            render={({field, form: {touched, errors}}: FieldProps) => (
                               <div className={styles.input}>
                                  <Input
                                     mod={!errors.name && touched.name ? "active" : undefined}
                                     type={"text"}
                                     placeholder={"Название компании"}
                                     isError={!!(errors.name && touched.name)}
                                     errorMessage={errors.name}
                                     {...field}
                                  />
                               </div>
                            )}
                     />
                  </div>
                  <div className={styles.submitBtn}>
                     <Button
                        mod={isLoading ? "loading" : "black"}
                        type={"submit"}
                     >
                        Дальше
                     </Button>
                  </div>
               </Form>}
      </Formik>
   )
}