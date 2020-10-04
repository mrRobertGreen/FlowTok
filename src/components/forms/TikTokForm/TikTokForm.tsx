import React, {FC, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import {validateRequiredField} from "../../../utils/validators";
import Button from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "../../Input/Input";
import {RootStateType} from "../../../redux/store";
import {MiniProfile} from "../../MiniProfile/MiniProfile";


export type TikTokFormValuesType = {
   link: string
}

type PropsType = {}

export const TikTokForm: FC<PropsType> = () => {
   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(false)
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   const tikTokSuccess = useSelector((state: RootStateType) => state.auth.tikTokSuccess)

   const onSubmit = async (values: TikTokFormValuesType, {resetForm, setFieldError}: FormikValues) => {

   }

   if (tikTokSuccess) return <MiniProfile/>

   return (
      <Formik
         initialValues={{
            link: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            () =>
               <Form className={styles.wrapper}>
                  <Field name={"link"}
                         validate={validateRequiredField}
                  >
                     {({field, form: {touched, errors}}: FieldProps) => (
                        <div className={styles.input}>
                           <Input
                              type={"text"}
                              placeholder={"Вставьте ссылку"}
                              isError={!!(errors.link && touched.link)}
                              errorMessage={errors.link}
                              {...field}
                           />
                        </div>
                     )}
                  </Field>
                  <div className={styles.row}>
                     <a href={isDesktop ? "https://www.tiktok.com/ru/" : "tiktok://"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btn}
                     >
                        <Button mod={"white"} type={"button"}>
                           Перейти в TikTok
                        </Button>
                     </a>
                     <div className={styles.submitBtn}>
                        <Button type="submit"  mod={isLoading ? "loading" : "black"}>
                           Подтвердить
                        </Button>
                     </div>
                  </div>
               </Form>}
      </Formik>
   )
}