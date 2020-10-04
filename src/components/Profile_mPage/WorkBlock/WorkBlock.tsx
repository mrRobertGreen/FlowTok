import React, {FC, useEffect} from "react";
import Nav from "./Nav/Nav";
import {useParams} from "react-router";
import {BlogTaskStatusType, getBlogTasks} from "../../../redux/user/user-reducer";
import {TaskCard_m} from "./TaskList/TaskCard_m/TaskCard_m";
import TopNavbar from "../../TopNavbar/TopNavbar";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {TaskCard} from "./TaskList/TaskCard/TaskCard";
import styles from "./styles.module.scss"
import {TaskList} from "./TaskList/TaskList";

type PropsType = {}

const WorkBlock: FC<PropsType> = () => {
   let {type} = useParams()
   const dispatch = useDispatch()
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   const newTasks = useSelector((state: RootStateType) => state.user.blogNewTasks)
   const doneTasks = useSelector((state: RootStateType) => state.user.blogDoneTasks)

   useEffect(() => {
      if (newTasks === null) dispatch(getBlogTasks("new"))
      if (doneTasks === null) dispatch(getBlogTasks("done"))
   }, [newTasks, doneTasks, dispatch])


   return (
      <div className={styles.container}>
         {!isDesktop && <TopNavbar label={"Задания"} logo={true}/>}
         <Nav taskType={type as BlogTaskStatusType}/>
         <TaskList taskType={type}/>
      </div>
   )

}

export default WorkBlock