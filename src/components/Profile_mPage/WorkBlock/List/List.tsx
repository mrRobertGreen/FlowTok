import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss"
import ListItem from "./ListItem/ListItem";
import {RootStateType} from "../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {BlogTaskStatusType, BlogTaskType, doBlogTask, getBlogTasks} from "../../../../redux/user-reducer";
import Preloader from "../../../common/Preloader/Preloader";
import {useCache} from "../../../../hooks/useCache";

type PropsType = {
   taskType: BlogTaskStatusType
}

export const List: FC<PropsType> = ({
                                       taskType,
                                              }) => {
   const dispatch = useDispatch()
   const newTasks = useSelector((state: RootStateType) => state.user.blogNewTasks)
   let doneTasks = useSelector((state: RootStateType) => state.user.blogDoneTasks)
   const doneTasksCache = useCache("blogDoneTasks")
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)

   useEffect(() => { // if current section is changed get necessary tasks
      dispatch(getBlogTasks(taskType))
   }, [taskType, dispatch])

   if (!doneTasks && doneTasksCache) {
      doneTasks = doneTasksCache
   }

   if (!isAuth) {
      return <Redirect to="/login/1"/>
   }
   if (taskType === "new" && !newTasks) {
      return <Preloader/>
   }
   if (taskType === "done" && !doneTasks) {
      return <Preloader/>
   }
   if (isFetching) {
      return <Preloader/>
   }

   if (newTasks && taskType === "new" && newTasks.length === 0) {
      return <div className={styles.message}>Заданий пока нет...</div>
   }
   if (doneTasks && taskType === "done" && doneTasks.length === 0) {
      return <div className={styles.message}>Заданий пока нет...</div>
   }

   const getTasks = () => {
      if (taskType === "new" && newTasks) {
         return newTasks
      }
      if (taskType === "done" && doneTasks) {
         return doneTasks
      }
      return [] as Array<BlogTaskType>
   }

   return (
      <div className={styles.wrapper}>
         {getTasks().map(task => (
            <ListItem
               key={task.id}
               id={task.id}
               title={task.title}
               info={task.info}
               rate={task.rate}
               link={task.link}
               text={task.text}
               url={task.url}
               taskType={taskType}
               doBlogTask={(id: string) => dispatch(doBlogTask(id))}
            />
         ))}
      </div>
   )
}