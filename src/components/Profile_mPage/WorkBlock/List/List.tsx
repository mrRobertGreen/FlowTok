import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss"
import ListItem from "./ListItem/ListItem";
import {SectionNames} from "../WorkBlock";
import {RootStateType} from "../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {BlogTaskType, doBlogTask, getBlogTasks} from "../../../../redux/user-reducer";
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
   const doneTasks = useSelector((state: RootStateType) => state.user.blogDoneTasks)
   const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)

   useEffect(() => { // if current section is changed get necessary tasks
      dispatch(getBlogTasks(currentSection))
   }, [currentSection, dispatch])

   if (!isAuth) {
      return <Redirect to="/login/1"/>
   }
   if (currentSection === "new" && !newTasks) {
      return <Preloader/>
   }
   if (currentSection === "done" && !doneTasks) {
      return <Preloader/>
   }
   if (isFetching) {
      return <Preloader/>
   }

   if (newTasks && currentSection === "new" && newTasks.length === 0) {
      return <div className={styles.message}>Заданий пока нет...</div>
   }
   if (doneTasks && currentSection === "done" && doneTasks.length === 0) {
      return <div className={styles.message}>Заданий пока нет...</div>
   }

   const getTasks = () => {
      if (currentSection === "new" && newTasks) {
         return newTasks
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
               text={task.text}
               url={task.url}
               currentSection={currentSection}
               doBlogTask={(id: string) => dispatch(doBlogTask(id))}
            />
         ))}
      </div>
   )
}