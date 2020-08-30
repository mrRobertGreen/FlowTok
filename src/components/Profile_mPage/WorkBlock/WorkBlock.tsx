import React, {FC} from "react";
import styles from "./styles.module.scss"
import Nav from "./Nav/Nav";
import {List} from "./List/List";
import {useParams} from "react-router";
import {BlogTaskStatusType} from "../../../redux/user/user-reducer";

type PropsType = {}

const WorkBlock: FC<PropsType> = () => {
   const {type} = useParams()

   return (
      <div className={styles.wrapper}>
         <Nav taskType={type as BlogTaskStatusType}/>
         <List taskType={type as BlogTaskStatusType}/>
      </div>
   )

}

export default WorkBlock