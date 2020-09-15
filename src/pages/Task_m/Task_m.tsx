import React from "react";
import {Page_m} from "../../components/Page/Page_m";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {cancelBlogTask, checkBlogTask} from "../../redux/user/user-reducer";
import {Redirect} from "react-router";
import Preloader from "../../components/common/Preloader/Preloader";

export const Task_m = () => {
   const task = useSelector((state: RootStateType) => state.user.task)
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)
   const dispatch = useDispatch()

   if (!task) return <Redirect to={"/work"}/>
   if (isFetching) return <Preloader/>

   const {id, info, link, rate, title, url, text} = task

   const onCancelTask = () => {
      dispatch(cancelBlogTask(id))
   }
   const onCheckTask = () => {
      dispatch(checkBlogTask(id))
   }

   return (
      <Page_m>
         <div className={styles.container}>
            <div>
               <div className={styles.title}>
                  <div>{title}</div>
               </div>
               <div className={styles.description}>
                  <div>{info}</div>
               </div>
               <div className={styles.instruction}>
                  <div className={styles.title}>
                     Как выполнить задание?
                  </div>
                  <div className={styles.item}>
                     1. Жмете кнопку {link ? `"Перейти к звуку"` : `"${text}"`}
                  </div>
                  <div className={styles.item}>
                     2. {link ? "Снимаете ролик с открывшимся звуком" : "Выполняете задание"}
                  </div>
                  <div className={styles.item}>
                     3. В течение одного часа возвращаетесь на сайт и жмете
                     кнопку "Проверить"
                  </div>
                  <div className={styles.item}>
                     4. Получаете деньги!
                  </div>
               </div>
            </div>
            <div className={styles.btnGroup}>
               <div className={styles.btnItem}>
                  <div className={styles.btn}>
                     <a href={link ? link : url} target="_blank" rel="noopener noreferrer">
                        <Button
                           mod={"black"}
                        >
                           {link ? "Перейти к звуку" : text}
                        </Button>
                     </a>
                  </div>
                  <div className={styles.price}>
                     <div className={styles.rub}>
                        {rate}₽
                     </div>
                     <div className={styles.label}>
                        {text ? "За задание" : "За ролик" }
                     </div>
                  </div>
               </div>
               <div className={styles.btnItem}>
                  <Button onClick={onCheckTask}>Проверить</Button>
               </div>
               <div className={styles.btnItem}>
                  <Button mod={"red"} onClick={onCancelTask}>Отменить</Button>
               </div>
            </div>
         </div>
      </Page_m>
   )
}