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
         <div className={styles.header}>
            Основные показатели
         </div>
         <div className={styles.stats}>
            <div className={styles.stats__item}>
               <div className={styles.value}>
                  {medianViews}
               </div>
               <div className={styles.prop}>
                  Среднее кол-во просмотров
               </div>
            </div>
            <div className={styles.stats__item}>
               <div className={styles.value}>
                  {rate}₽
               </div>
               <div className={styles.prop}>
                  Вам заплатят за один ролик
               </div>
            </div>
            <div className={styles.stats__item}>
               <div className={styles.value}>
                  {rating}
               </div>
               <div className={styles.prop}>
                  Ваш рейтинг
               </div>
            </div>
         </div>
      </div>
   )

}

export default Stats