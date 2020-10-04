import React, {FC, useEffect} from "react";
import Nav from "./Nav/Nav";
import {useParams} from "react-router";
import {ContainerT, getBlogTasks} from "../../../redux/user/user-reducer";
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
   const task = useSelector((state: RootStateType) => state.user.task)

   // useEffect(() => {
   //    if (newTasks === null) dispatch(getBlogTasks("new"))
   //    if (doneTasks === null) dispatch(getBlogTasks("done"))
   // }, [newTasks, doneTasks, dispatch])


   if (task) {
      type = "active"
   }

   return (
      <div className={styles.container}>
         {!isDesktop && <TopNavbar label={"Задания"} logo={true}/>}
         <Nav type={type as ContainerT}/>
         <TaskList taskType={type}/>
      </div>
   )

}

export default WorkBlock