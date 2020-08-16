import styles from "./styles.module.scss";
import {Field, Form, Formik, FormikValues} from "formik";
import React, {FC, useEffect, useState} from "react";
import Button from "../../../Button/Button";
import classNames from "classnames";
import Slider from "./Slider/Slider";
import {AdvCreateTaskType} from "../../../../api/user-api";
import {Redirect} from "react-router";
import Preloader from "../../../common/Preloader/Preloader";
import {validateRequiredField} from "../../../../utils/validators";

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
         quantity: +sliderValue,
         quality: 100 - sliderValue
      }
      createAdvTask(taskPayload)
      if (isAdvTaskCreated) {
         resetForm()
      }
   }

   type ActiveBtnType = 100 | 500 | 1000 | 0  // 0 - nobody is selected
   const [activeBtn, setActiveBtn] = useState(0 as ActiveBtnType)
   const [sliderValue, setSliderValue] = useState(0);

   return (
      <Formik
         validate={(values: CampaignType) => {
            if (+values.value !== activeBtn) {
               setActiveBtn(0)
            }
         }}
         validateOnChange={false}
         initialValues={{
            title: "",
            info: "",
            link: "",
            value: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, errors, touched}) =>
               <Form className={styles.wrapper}>
                  {isAdvTaskCreated && !isFetching && <Redirect to={"/cabinet"}/>}
                  {isFetching && <Preloader/>}
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
                  <div className={styles.label}>Выберите сумму</div>
                  <div className={styles.btnGroup}>
                     <div className={classNames(styles.btn, {
                        [styles.activeBtn]: activeBtn === 100,
                     })}
                          onClick={() => {
                             setActiveBtn(100)
                             setFieldValue("value", 100)
                          }}
                     >
                        100₽
                     </div>
                     <div className={classNames(styles.btn, {
                        [styles.activeBtn]: activeBtn === 500,
                     })}
                          onClick={() => {
                             setActiveBtn(500)
                             setFieldValue("value", 500)
                          }}
                     >
                        500₽
                     </div>
                     <div className={classNames(styles.btn, {
                        [styles.activeBtn]: activeBtn === 1000,
                     })}
                          onClick={() => {
                             setActiveBtn(1000)
                             setFieldValue("value", 1000)
                          }}
                     >
                        1000₽
                     </div>
                  </div>
                  <Field name={"value"}
                         placeholder={"Ввести свою сумму"}
                         type={"number"}
                         validate={validateRequiredField}
                         className={classNames(styles.input, {[styles.error]: errors.value && touched.value})}
                  />
                  <Slider value={sliderValue} setValue={setSliderValue}/>
                  <div className={styles.submitBtn}>
                     <Button type="submit">
                        Создать кампанию
                     </Button>
                  </div>
               </Form>}
      </Formik>
   )
}