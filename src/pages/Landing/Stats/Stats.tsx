import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {userApi} from "../../../api/user-api";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {getUsersCount} from "../../../redux/user/user-reducer";
import {getPaid} from "../../../utils/realTimeData";


export const Stats: FC = () => {

   const dispatch = useDispatch()
   const userStats = useSelector((state: RootStateType) => state.user.userStats)
   const [paid, setPaid] = useState(getPaid())

   useEffect(() => {
      dispatch(getUsersCount())
   }, [])

   useEffect(() => {
      const interval = setInterval(() => {
         dispatch(getUsersCount())
      }, 5000)
      return () => clearInterval(interval)
   }, [userStats])

   useEffect(() => {
      const interval = setInterval(() => {
         setPaid(getPaid())
      }, 5000)
      return () => clearInterval(interval)
   }, [paid])

   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <p className={styles.bold}>
               {userStats.quantity}
            </p>
            <p className={styles.little}>
               Пользователей в Container
            </p>
         </div>
         <div className={styles.container}>
            <p className={styles.bold}>
               {paid} ₽
            </p>
            <p className={styles.little}>
               Всего выплачено
            </p>
         </div>
         <div className={styles.container}>
            <p className={styles.bold}>
               1 578 ₽
            </p>
            <p className={styles.little}>
               Средний доход в день
            </p>
         </div>
      </div>
   )
}