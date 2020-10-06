import React, {FC, useEffect, useState} from "react";
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
import {authMe, verify} from "../../../redux/auth/auth-reducer";
import {VerifyPayloadType} from "../../../api/user-api";
import {osName} from "react-device-detect"
import {useRedirect} from "../../../hooks/useRedirect";
import {AuthMeReqPayloadType} from "../../../api/auth-api";

export type LoginFormValuesType = {
   email: string
   password: string
   type: "u" | "f"
}

type PropsType = {}

export const LoginForm: FC<PropsType> = () => {
   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(false)
   const needMoreInfo = useSelector((state: RootStateType) => state.auth.needMoreInfo)
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)

   useRedirect(needMoreInfo, "/reg")
   useRedirect(isAuth, "/profile")

   const onSubmit = async (values: LoginFormValuesType, {resetForm}: FormikValues) => {
      const payload: AuthMeReqPayloadType = {
         auth: values.email,
         password: values.password,
         type: values.type,
      }
      dispatch(authMe(payload, resetForm, setIsLoading))
   }

   const validateMinLength = createMinLengthValidator(6)

   return (
      <Formik
         initialValues={{
            email: "",
            password: "",
            type: "f"
         }}
         validateOnChange={false}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, setFieldTouched, values}) =>
               <Form className={styles.wrapper}>
                  <div className={styles.block}>
                     <div className={styles.row}>
                        <Button
                           mod={"white"}
                           type={"button"}
                           isActive={values.type === "f"}
                           onClick={() => setFieldValue("type", "f", false)}
                        >
                           Физ. лицо
                        </Button>
                        <Button
                           mod={"white"}
                           type={"button"}
                           isActive={values.type === "u"}
                           onClick={() => setFieldValue("type", "u", false)}
                        >
                           Юр. лицо
                        </Button>
                     </div>
                     <Field name={"email"}
                            validate={emailValidator}>
                        {({field, form: {touched, errors}}: FieldProps) => (
                           <div className={styles.input}>
                              <Input
                                 mod={!errors.email && touched.email ? "active" : undefined}
                                 type={"email"}
                                 placeholder={"Email"}
                                 isError={!!(errors.email && touched.email)}
                                 errorMessage={errors.email}
                                 {...field}
                              />
                           </div>
                        )}
                     </Field>
                     <Field name={"password"}
                            validate={validateMinLength}
                     >
                        {({field, form: {touched, errors}}: FieldProps) => (
                           <div className={styles.input}>
                              <Input
                                 mod={!errors.password && touched.password ? "active" : undefined}
                                 type={"password"}
                                 placeholder={"Пароль"}
                                 isError={!!(errors.password && touched.password)}
                                 errorMessage={errors.password}
                                 {...field}
                              />
                           </div>
                        )}
                     </Field>

                  </div>
                  <div className={styles.submitBtn}>
                     <Button
                        mod={isLoading ? "loading" : "black"}
                        type={"submit"}
                     >
                        Войти
                     </Button>
                  </div>
               </Form>}
      </Formik>
   )
}