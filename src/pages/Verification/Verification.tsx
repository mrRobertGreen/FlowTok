import React, {FC} from "react";
import Button from "../../components/Button/Button";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import styles from "./styles.module.scss"
import {NavLink} from "react-router-dom";

export const Verification: FC = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return (
      <div className={styles.wrapper}>
         <TopNavbar label={"Верификация"} />
         <div className={styles.info}>
            <p className={styles.mainLabel}>Пройди верификацию и начни зарабатывать больше!</p>
            <p className={styles.label}>Пользователь с верифицированным аккаунтом:</p>
            <p className={styles.subLabel}>• Не имеет ограничений по стоимости каждого ролика</p>
            <p className={styles.subLabel}>•	Имеет доступ к большему количеству заданий</p>
            {/*<p className={styles.subLabel}>• Получает аж 10% дохода рефералов</p>*/}
            <p className={styles.subLabel}>• Получает личный респект от создателей сервиса ;)</p>
            <p className={styles.label}>Чтобы пройти верификацию, вам нужно:</p>
            <p className={styles.subLabel}>• Снимать качественный и интересный контент*</p>
            <p className={styles.subLabel}>• Заполнить небольшую анкету</p>
            <p className={styles.subLabel}>• Дождаться ответа от наших менеджеров</p>
            <p className={styles.note}>
               * под качественным контентом подразумеваются видео с хорошим разрешением, красивой картинкой и уникальным
               содержанием. Блогеры, снимающие экран своего устройства, видеоигры, а также ворующие видео у других
               блогеров, с большой долей вероятности не пройдут верификацию
            </p>
            <p className={styles.mainLabel}>Жми кнопку «Продолжить», чтобы пройти верификацию прямо сейчас!</p>
            <p className={styles.message}><span>Внимание!</span> Начиная с 31.08.2020 пользователи, не прошедшие верификацию, не смогут получать больше 15 рублей
               за одно задание.</p>
         </div>
         <div className={styles.btn}>
            <NavLink to={"verification/form"}>
               <Button>Продолжить</Button>
            </NavLink>
         </div>
      </div>
   )
}