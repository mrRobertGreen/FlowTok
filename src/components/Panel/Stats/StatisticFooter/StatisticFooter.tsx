import React, {FC} from "react"
import styles from "./styles.module.scss"

export const StatisticFooter: FC = () => {
    return (
      <div className={styles.wrapper}>
          <div className={styles.container}>
              <div className={styles.point1}></div>
              <div className={styles.text}>
                  <p className={styles.text__category}>Просмотры</p>
                  <p className={styles.text__numbers}>12359</p>
                  <p className={styles.text__cost}>1.2₽ / 1 просмотр</p>
              </div>
          </div>
          <div className={styles.container}>
              <div className={styles.point2}></div>
              <div className={styles.text}>
                  <p className={styles.text__category}>Лайк</p>
                  <p className={styles.text__numbers}>6293</p>
                  <p className={styles.text__cost}>3.6₽ / 1 лайк</p>
              </div>
          </div>
          <div className={styles.container}>
              <div className={styles.point3}></div>
              <div className={styles.text}>
                  <p className={styles.text__category}>Репосты</p>
                  <p className={styles.text__numbers}>2 492</p>
                  <p className={styles.text__cost}>6.1₽ / 1 репост</p>
              </div>
          </div>

      </div>
    );
}