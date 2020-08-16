import React, {FC} from "react";
import styles from "./styles.module.scss"
import classNames from "classnames";
import {SectionNames} from "../WorkBlock";
import {connect, ConnectedProps} from "react-redux";
import {doBlogTask, finishBlogTask, getBlogTasks, userActions} from "../../../../redux/user-reducer";
import {RootStateType} from "../../../../redux/store";

type PropsType = {
   currentSection: SectionNames
   setCurrentSection: (section: SectionNames) => void
}

const Nav: FC<PropsType & PropsFromRedux> = ({setCurrentSection, currentSection, deleteAllBlogTasks}) => {

   const onClickNewSection = () => {
      setCurrentSection("new")
      deleteAllBlogTasks()
   }
   const onClickDoneSection = () => {
      setCurrentSection("done")
      deleteAllBlogTasks()
   }
   const onClickWaitingSection = () => {
      setCurrentSection("wait")
      deleteAllBlogTasks()
   }

   return (
      <nav className={styles.wrapper}>
         <div className={styles.sections}>
            <div
               className={classNames(styles.item, {[styles.active]: currentSection === "new"})}
               onClick={onClickNewSection}
            >
               <div>Активные</div>
            </div>
            <div
               className={classNames(styles.item, {[styles.active]: currentSection === "wait"})}
               onClick={onClickWaitingSection}
            >
               <div>Ожидают</div>
            </div>
            <div
               className={classNames(styles.item, {[styles.active]: currentSection === "done"})}
               onClick={onClickDoneSection}
            >
               <div>Выполненные</div>
            </div>
         </div>
      </nav>
   )

}

const mapDispatchToProps = {
   deleteAllBlogTasks: userActions.deleteAllBlogTasks
}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Nav)