import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss"
import ListItem from "./ListItem/ListItem";
import {SectionNames} from "../WorkBlock";
import {RootStateType} from "../../../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {compose} from "redux";
import {Redirect} from "react-router";
import {doBlogTask, finishBlogTask, getBlogTasks, userActions} from "../../../../redux/user-reducer";
import Preloader from "../../../common/Preloader/Preloader";

type PropsType = {
   currentSection: SectionNames
   setCurrentSection: (section: SectionNames) => void
}

const List: FC<PropsType & PropsFromRedux> = ({
                                                 currentSection,
                                                 tasks,
                                                 getTasks,
                                                 isAuth,
                                                 doBlogTask,
                                                 finishBlogTask,
                                                 setCurrentSection
                                              }) => {
   useEffect(() => {
      getTasks(currentSection)
   }, [currentSection, getTasks])

   if (!isAuth) {
      return <Redirect to="/login/1"/>
   }
   if (!tasks) {
      return <Preloader/>
   }
   if (tasks.length === 0) {
      return <div className={styles.message}>Заданий пока нет...</div>
   }

   return (
      <div className={styles.wrapper}>
         {tasks.map(task => (
            <ListItem
               key={task.id}
               id={task.id}
               title={task.title}
               info={task.info}
               rate={task.rate}
               link={task.link}
               currentSection={currentSection}
               doBlogTask={doBlogTask}
               finishBlogTask={finishBlogTask}
               setCurrentSection={setCurrentSection}
            />
         ))}
      </div>
   )
}

const mapStateToProps = (state: RootStateType) => ({
   tasks: state.user.blogTasks,
   isAuth: state.auth.isAuth
})

const mapDispatchToProps = {
   setTasksData: userActions.setBlogTasks,
   getTasks: getBlogTasks,
   doBlogTask,
   finishBlogTask
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose(
   connector,
)(List)
