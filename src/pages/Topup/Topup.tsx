import React, {FC, useState} from "react";
import {Field, Form, Formik, FormikValues} from "formik";
import styles from "../../components/Cabinet_mPage/CreateTask/CreateTaskForm/styles.module.scss";
import Preloader from "../../components/common/Preloader/Preloader";
import classNames from "classnames";
import {validateRequiredField} from "../../utils/validators";
import Button from "../../components/Button/Button";
import {sha256} from 'js-sha256';
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";

type PropsType = {}

export const TopupForm: FC<PropsType> = () => {

   const callback = (amount: number) => {
      const token = localStorage.getItem("token");
      if (amount !== 0) {
         let desc = "Пополнение";
         let account = token
         let sha = sha256(`${account}{up}${desc}{up}${amount}{up}d4ebb2dbaf23d5ef7089da19236d3986`);
         window.location.href = `https://unitpay.ru/pay/310431-23184/card?sum=${amount}&account=${account}&desc=${desc}&signature=${sha}&код_системы=card`;
         setIsSubmit(true)
      } else {
         alert("Введите правильную сумму");
      }
   }

   const onSubmit = async (values: { value: string }, {resetForm}: FormikValues) => {
      await callback(+values.value)
      resetForm()
   }

   type ActiveBtnType = 100 | 500 | 1000 | 0  // 0 - nobody is selected
   const [activeBtn, setActiveBtn] = useState(0 as ActiveBtnType)
   const [isSubmit, setIsSubmit] = useState(false)
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)

   return (
      <Formik
         validate={(values: { value: string }) => {
            if (+values.value !== activeBtn) {
               setActiveBtn(0)
            }
         }}
         initialValues={{
            value: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, errors, touched}) =>
               <Form className={styles.wrapper}>
                  {isFetching && <Preloader/>}
                  {isSubmit && <Redirect to={"/cabinet"}/>}
                  <div>
                     <div className={styles.label}>Выберите сумму</div>
                     <div className={styles.btnGroup}>
                        <div className={classNames(styles.btn, {
                           [styles.activeBtn]: activeBtn === 100,
                        })}
                             onClick={async () => {
                                await setActiveBtn(100)
                                setFieldValue("value", 100)
                             }}
                        >
                           100₽
                        </div>
                        <div className={classNames(styles.btn, {
                           [styles.activeBtn]: activeBtn === 500,
                        })}
                             onClick={async () => {
                                await setActiveBtn(500)
                                setFieldValue("value", 500)
                             }}
                        >
                           500₽
                        </div>
                        <div className={classNames(styles.btn, {
                           [styles.activeBtn]: activeBtn === 1000,
                        })}
                             onClick={async () => {
                                await setActiveBtn(1000)
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
                  </div>
                  <div className={styles.submitBtn}>
                     <Button type="submit">
                        Пополнить
                     </Button>
                  </div>
               </Form>}
      </Formik>
   )
}