import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import Preloader from "../../../components/common/Preloader/Preloader";
import styles from "./styles.module.scss";
import {Input} from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import {validateRequiredField} from "../../../utils/validators";
import classNames from "classnames";
import {osName} from "react-device-detect"
import {VerifyPayloadType} from "../../../api/user-api";
import {useHistory} from "react-router";


type VerifyValues = {
   sex: string
   country: string
   age: string
}

export const VerifyForm: FC = () => {
   const dispatch = useDispatch()
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)
   const history = useHistory()

   const onSubmit = async (values: VerifyValues, {resetForm}: FormikValues) => {
      const payload: VerifyPayloadType = {
         sex: values.sex,
         country: values.country,
         age: +values.age,
         platform: osName,
      }
   }

   if (isFetching) return <Preloader/>

   return (
      <Formik
         initialValues={{
            sex: "",
            age: "",
            country: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({errors, touched}) =>
               <Form className={styles.wrapper}>
                  <div className={styles.topBlock}>
                     <div className={styles.subLabel}>
                        Ваше место проживания:
                     </div>
                     <div className={styles.subLabel}>
                        Ваш возраст:
                     </div>
                     <Field name={"age"} validate={validateRequiredField}>
                        {({
                             field,
                             form: {touched, errors}
                          }: FieldProps) => (
                           <div className={styles.input_small}>
                              <Input {...field}
                                 placeholder={"0"}
                                     type={"number"}
                                     min={0}
                                     max={125}
                                     mod={"blue"}
                                     isError={!!(errors.age && touched.age)}/>
                           </div>
                        )}
                     </Field>
                     <div className={styles.subLabel}>
                        Ваш пол:
                     </div>
                     <div className={styles.radioGroup} role="group">
                        <label>
                           <Field type="radio"
                                  name="sex"
                                  value="man"
                                  className={classNames(styles.radio, {[styles.error]: errors.sex && touched.sex})}
                                  validate={validateRequiredField}/>
                           <div className={styles.radioName}>Мужской</div>
                        </label>
                        <label>
                           <Field type="radio" name="sex" value="woman" className={styles.radio} validate={validateRequiredField}/>
                           <div className={styles.radioName}>Женский</div>
                        </label>
                     </div>
                     {errors.sex && touched.sex &&
                     <div className={styles.errorMsg}>
                        Вы не выбрали пол
                     </div>
                     }
                  </div>
                  <div className={styles.submitBtn}>
                     <Button type="submit">
                        Отправить на верификацию
                     </Button>
                  </div>
               </Form>}
      </Formik>
   )
}