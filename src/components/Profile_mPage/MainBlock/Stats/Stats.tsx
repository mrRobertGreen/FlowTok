import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useMedia} from "react-media";
import {GLOBAL_MEDIA_QUERIES} from "../../../Page/Page";

type PropsType = {
   rate: number
   medianViews: string
   rating: number
}

const Stats: FC<PropsType> = ({rate, medianViews, rating}) => {
   const queries = useMedia({queries: GLOBAL_MEDIA_QUERIES})

   return (
      <div className={styles.wrapper}>
         <div className={styles.title}>
            Показатели
         </div>
         <div className={styles.stats}>
            <div className={styles.stats__item}>
               <div className={styles.prop}>
                  Среднее кол-во просмотров
               </div>
               <div className={styles.value}>
                  {medianViews}
               </div>
            </div>
            <div className={styles.stats__item}>
               <div className={styles.prop}>
                  Выплата за один ролик
               </div>
               <div className={styles.value}>
                  {rate}₽
               </div>
            </div>
            <div className={styles.stats__item}>
               <div className={styles.prop}>
                  Рейтинг для рекламодателей
               </div>
               <div className={styles.value} style={{color: queries.largeTablet ? "#24C054" : "black"}}>
                  {rating}
               </div>
            </div>
         </div>
      </div>
   )

}

export default Stats