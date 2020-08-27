import styles from "./styles.module.scss";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import React, {FC, useEffect, useState} from "react";
import Button from "../../Button/Button";
import classNames from "classnames";
import Slider from "./Slider/Slider";
import {AdvCreateTaskType} from "../../../api/user-api";
import {Redirect} from "react-router";
import Preloader from "../../common/Preloader/Preloader";
import {createMaxMinSumValidator, createMinSumValidator, validateRequiredField} from "../../../utils/validators";
import {ChooseAmount} from "../../forms/common/ChooseAmount/ChooseAmount";
import {Input} from "../../Input/Input";

type CampaignType = {
   title: string
   info: string
   link: string
   value: string
}

type PropsType = {
   createAdvTask: (task: AdvCreateTaskType) => void
   isAdvTaskCreated: boolean
   setIsAdvTaskCreated: (flag: boolean) => void
   isFetching: boolean
}

export const CreateTaskForm: FC<PropsType> = ({createAdvTask, isAdvTaskCreated, isFetching, setIsAdvTaskCreated}) => {
   useEffect(() => {
      setIsAdvTaskCreated(false)
   }, [setIsAdvTaskCreated])

   const onSubmit = (values: CampaignType, {resetForm}: FormikValues) => {
      const taskPayload = {
         title: values.title,
         info: values.info,
         link: values.link,
         value: +values.value,
         quantity: 100,
         quality: 0,
      }
      createAdvTask(taskPayload)
      if (isAdvTaskCreated) {
         resetForm()
      }
   }


   type ActiveBtnType = 100 | 500 | 1000 | 0  // 0 - nobody is selected
   const [activeBtn, setActiveBtn] = useState(0 as ActiveBtnType)
   // const [sliderValue, setSliderValue] = useState(0);


   if (isFetching) return <Preloader/>
   if (isAdvTaskCreated && !isFetching) return <Redirect to={"/cabinet"}/>

   return (
      <Formik
         validate={(values: CampaignType) => {
            if (+values.value !== activeBtn) {
               setActiveBtn(0)
            }
         }}
         initialValues={{
            title: "",
            info: "",
            link: "",
            value: "",
            maxSum: "",
            minSum: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, errors, touched, values}) =>
               <Form className={styles.wrapper}>
                  <div>
                     <Field className={classNames(styles.input, {[styles.error]: errors.title && touched.title})}
                            name={"title"}
                            placeholder={"Название кампании"}
                            validate={validateRequiredField}
                     />
                     <Field placeholder={"Описание"}
                            className={classNames(styles.textarea, {[styles.error]: errors.info && touched.info})}
                            name={"info"}
                            as={"textarea"}
                            validate={validateRequiredField}
                            rows={6}
                     />
                     <Field placeholder={"Вставьте ссылку на звук"}
                            name={"link"}
                            validate={validateRequiredField}
                            className={classNames(styles.input, {[styles.error]: errors.link && touched.link})}/>
                     <ChooseAmount setFieldValue={setFieldValue} amount={values.value} field={"value"}/>
                     <Field name={"value"} validate={createMinSumValidator(1)}>
                        {({
                             field,
                             form: {touched, errors}
                          }: FieldProps) => (
                           <Input
                              mod={"blue"}
                              type={"number"}
                              placeholder={"Ввести свою сумму"}
                              isError={!!(errors.value && touched.value)}
                              errorMessage={errors.value}
                              {...field}
                           />
                        )}
                     </Field>
                     {/*<div className={styles.label}>Стоимость одного видеоролика</div>*/}
                     {/*<div className={styles.flexbox}>*/}
                     {/*   <div className={styles.word}>От</div>*/}
                     {/*   <Field name={"minSum"}*/}
                     {/*          validate={createMaxMinSumValidator(0.1, +values.maxSum)}>*/}
                     {/*      {({*/}
                     {/*           field,*/}
                     {/*           form: {touched, errors}*/}
                     {/*        }: FieldProps) => (*/}
                     {/*         <Input*/}
                     {/*            mod={"blue"}*/}
                     {/*            type={"number"}*/}
                     {/*            placeholder={"Сумма"}*/}
                     {/*            isError={!!(errors.minSum && touched.minSum && touched.maxSum)}*/}
                     {/*            {...field}*/}
                     {/*         />*/}
                     {/*      )}*/}
                     {/*   </Field>*/}
                     {/*   <div className={styles.rub}>₽</div>*/}
                     {/*   <div className={styles.word}>до</div>*/}
                     {/*   <Field name={"maxSum"}*/}
                     {/*          validate={createMaxMinSumValidator(+values.minSum, Infinity)}>*/}
                     {/*      {({*/}
                     {/*           field,*/}
                     {/*           form: {touched, errors}*/}
                     {/*        }: FieldProps) => (*/}
                     {/*         <Input*/}
                     {/*            mod={"blue"}*/}
                     {/*            type={"number"}*/}
                     {/*            placeholder={"Сумма"}*/}
                     {/*            isError={!!(errors.maxSum && touched.maxSum && touched.minSum)}*/}
                     {/*            {...field}*/}
                     {/*         />*/}
                     {/*      )}*/}
                     {/*   </Field>*/}
                     {/*   <div className={styles.rub}>₽</div>*/}
                     {/*</div>*/}
                     {/*<Slider value={sliderValue} setValue={setSliderValue}/>*/}
                  </div>
                  <div className={styles.submitBtn}>
                     <Button type="submit">
                        Создать кампанию
                     </Button>
                  </div>
               </Form>}
      </Formik>
   )
}