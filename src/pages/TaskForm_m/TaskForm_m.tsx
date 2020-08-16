import React, {FC} from "react";
import styles from "./styles.module.scss"
import CreateTask from "../../components/Cabinet_mPage/CreateTask/CreateTask";
import {withAuthRedirect, withProfileRedirect} from "../../hocs/hocs";
import { compose } from "redux";

type PropsType = {}

const TaskForm_m: FC<PropsType> = () => {
   return (
      <div className={styles.wrapper}>
         <CreateTask/>
      </div>
   )
}

export default compose(
   withAuthRedirect,
   withProfileRedirect
)(TaskForm_m)