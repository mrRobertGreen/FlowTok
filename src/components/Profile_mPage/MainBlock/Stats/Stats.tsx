import React, {FC} from "react";
import styles from "./styles.module.scss"

type PropsType = {
   rate: number
   medianViews: string
   rating: number
}

const Stats: FC<PropsType> = ({rate, medianViews, rating}) => {
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
               <div className={styles.value}>
                  {rating}
               </div>
            </div>
         </div>
      </div>
   )

}

export default Stats