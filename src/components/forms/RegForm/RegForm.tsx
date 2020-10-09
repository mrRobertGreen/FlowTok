import React, {FC, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import {createMinLengthValidator, emailValidator, validateRequiredField} from "../../../utils/validators";
import Button from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "../../Input/Input";
import {RootStateType} from "../../../redux/store";
import {authMe} from "../../../redux/auth/auth-reducer";
import {AuthMeReqPayloadType} from "../../../api/auth-api";
import {useRedirect} from "../../../hooks/useRedirect";
import {NavLink} from "react-router-dom";

export type RegFormValuesType = {
    ogrn: string
    inn: string
    name: string
    type: "f" | "u"
    password: string
    email: string
}

type PropsType = {}

export const RegForm: FC<PropsType> = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)
    const [isLoading, setIsLoading] = useState(false);
    const validateMinLength = createMinLengthValidator(6);

    useRedirect(isAuth, "/profile")

    const onSubmit = async (values: RegFormValuesType, {resetForm,}: FormikValues) => {
       let payload: AuthMeReqPayloadType
       if (values.type === "f") {
           payload = {
             type: values.type,
             password: values.password,
             auth: values.email
          }
       } else {
           payload = {
             inn: values.inn,
             name: values.name,
             ogrn: values.ogrn,
             type: values.type,
             password: values.password,
             auth: values.email
          }
       }

        dispatch(authMe(payload, resetForm, setIsLoading))
    }

    return (
        <Formik
            initialValues={{
                ogrn: "",
                inn: "",
                name: "",
                type: "f",
                password: "",
                email: "",
            }}
            validateOnChange={false}
            onSubmit={onSubmit}
            className={styles.formik}
        >
            {
                ({setFieldValue, values}) =>
                    <Form className={styles.wrapper}>
                        <div className={styles.block}>
                            <div className={styles.block_2}>
                                <div className={styles.row_2}>
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

                           {values.type === "u" &&
                           <>
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
	                           /></>
                          }
                        </div>
                        <div className={styles.submitBtn}>
                            <Button
                                mod={isLoading ? "loading" : "black"}
                                type={"submit"}
                            >
                                Создать аккаунт
                            </Button>
                            <NavLink to={"/login"}>
                                <p className={styles.in}>Войти</p>
                            </NavLink>
                        </div>
                    </Form>}
        </Formik>
    )
}