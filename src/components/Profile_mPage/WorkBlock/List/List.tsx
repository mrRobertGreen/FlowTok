import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss"
import ListItem from "./ListItem/ListItem";
import {SectionNames} from "../WorkBlock";
import {RootStateType} from "../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {BlogTaskType, doBlogTask, finishBlogTask, getBlogTasks} from "../../../../redux/user-reducer";
import Preloader from "../../../common/Preloader/Preloader";

type PropsType = {
   currentSection: SectionNames
   setCurrentSection: (section: SectionNames) => void
}

export const List: FC<PropsType> = ({
                                                 currentSection,
                                                 setCurrentSection
                                              }) => {
   const dispatch = useDispatch()
   const newTasks = useSelector((state: RootStateType) => state.user.blogNewTasks)
   const waitTasks = useSelector((state: RootStateType) => state.user.blogWaitTasks)
   const doneTasks = useSelector((state: RootStateType) => state.user.blogDoneTasks)
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)

   useEffect(() => { // if current section is changed get necessary tasks
      dispatch(getBlogTasks(currentSection))
   }, [currentSection, dispatch])

   if (!isAuth) {
      return <Redirect to="/login/1"/>
   }
   if (currentSection === "new" && !newTasks) {
      return <Preloader/>
   }
   if (currentSection === "wait" && !waitTasks) {
      return <Preloader/>
   }
   if (currentSection === "done" && !doneTasks) {
      return <Preloader/>
   }

   if (newTasks && currentSection === "new" && newTasks.length === 0) {
      return <div className={styles.message}>Заданий пока нет...</div>
   }
   if (waitTasks && currentSection === "wait" && waitTasks.length === 0) {
      return <div className={styles.message}>Заданий пока нет...</div>
   }
   if (doneTasks && currentSection === "done" && doneTasks.length === 0) {
      return <div className={styles.message}>Заданий пока нет...</div>
   }

   const getTasks = () => {
      if (currentSection === "new" && newTasks) {
         return newTasks
      }
      if (currentSection === "wait" && waitTasks) {
         return waitTasks
      }
      if (currentSection === "done" && doneTasks) {
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
               currentSection={currentSection}
               doBlogTask={(id: string) => dispatch(doBlogTask(id))}
               finishBlogTask={(id: string, inputValue: string) => dispatch(finishBlogTask(id, inputValue))}
               setCurrentSection={setCurrentSection}
            />
         ))}
      </div>
   )
}