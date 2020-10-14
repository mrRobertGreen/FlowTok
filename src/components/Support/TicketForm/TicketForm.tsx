import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.scss"
import cross from "../../../media/images_new/Cross.svg"
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import {validateRequiredField} from "../../../utils/validators";
import {Input} from "../../Input/Input";
import Button from "../../Button/Button";
import {TextArea} from "../../common/TextArea/TextArea";
import {useDispatch} from "react-redux";
import {CreateTicketReqBodyT} from "../../../api/user-api";
import {createTicket} from "../../../redux/user/user-reducer";

type TicketFormValuesType = {
   subject: string
   message: string
}
type PropsT = {
   onClose: () => void
}

export const TicketForm: FC<PropsT> = ({onClose}) => {

   const dispatch = useDispatch()
   const onSubmit = (values: TicketFormValuesType, {resetForm}: FormikValues) => {
      const payload: CreateTicketReqBodyT = {
         text: values.message,
         topic: values.subject
      }
      dispatch(createTicket(payload, resetForm, onClose))
   }

   const {t} = useTranslation();

   return (
      <div className={styles.wrapper}>
         <img src={cross} alt="" className={styles.cross} onClick={onClose}/>
         <div className={styles.title}>
            {t("support-form-title")}
         </div>
         <Formik
            initialValues={{
               subject: "",
               message: "",
            }}
            onSubmit={onSubmit}
            className={styles.formik}
         >
            {
               ({setFieldValue, values}) =>
                  <Form className={styles.form}>
                     <Field name={"subject"}
                            validate={validateRequiredField}
                            render={({field, form: {touched, errors}}: FieldProps) => (
                               <div className={styles.input}>
                                  <Input
                                     mod={!errors.subject && touched.subject ? "active" : undefined}
                                     type={"text"}
                                     br={"11px"}
                                     placeholder={t("support-form-subject")}
                                     isError={!!(errors.subject && touched.subject)}
                                     errorMessage={errors.subject}
                                     {...field}
                                  />
                               </div>
                            )}
                     />
                     <Field name={"message"}
                            validate={validateRequiredField}
                            render={({field, form: {touched, errors}}: FieldProps) => (
                               <div className={styles.input}>
                                  <TextArea
                                     mod={!errors.message && touched.message ? "active" : undefined}
                                     type={"text"}
                                     placeholder={t("support-form-message")}
                                     isError={!!(errors.message && touched.message)}
                                     errorMessage={errors.message}
                                     {...field}
                                  />
                               </div>
                            )}
                     />

                     <div className={styles.btn}>
                        <Button mod={"gradient"} type={"submit"}>{t("support-form-create")}</Button>
                     </div>
                  </Form>}
         </Formik>
      </div>

   )
}