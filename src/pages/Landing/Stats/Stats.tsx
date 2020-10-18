import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {userApi} from "../../../api/user-api";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {getUsersCount} from "../../../redux/user/user-reducer";
import {format, getAverage, getPaid, round} from "../../../utils/realTimeData";
import {useTranslation} from "react-i18next";


export const Stats: FC = () => {

   const {t} = useTranslation();

   const dispatch = useDispatch()
   const userStats = useSelector((state: RootStateType) => state.user.userStats)
   const [paid, setPaid] = useState(getPaid())
   const [average, setAverage] = useState(getAverage())

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
      }, 4000)
      return () => clearInterval(interval)
   }, [paid])

   useEffect(() => {
      const interval = setInterval(() => {
         setAverage(getAverage())
      }, 14400)
      return () => clearInterval(interval)
   }, [average])

   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <p className={styles.bold}>
               {format(userStats.quantity)}
            </p>
            <p className={styles.little}>
               {t("container-users-text")}
            </p>
         </div>
         <div className={styles.container}>
            <p className={styles.bold}>
               {format(paid)} $
            </p>
            <p className={styles.little}>
               {t("paid-text")}
            </p>
         </div>
         <div className={styles.container}>
            <p className={styles.bold}>
               {format(average)} $
            </p>
            <p className={styles.little}>
               {t("average-text")}
            </p>
         </div>
      </div>
   )
}