import React, {FC} from "react";
import styles from "./styles.module.scss"
import CreateTask from "../../components/Cabinet_mPage/CreateTask/CreateTask";
import {withAuthRedirect, withProfileRedirect} from "../../hocs/hocs";
import { compose } from "redux";
import TopNavbar from "../../components/TopNavbar/TopNavbar";

type PropsType = {isDesktop: boolean}

const TaskForm_m: FC<PropsType> = ({isDesktop}) => {
   return (
      <div className={styles.wrapper}>
         <TopNavbar label={"Создание кампании"} isMenu={false} isDesktop={isDesktop}/>
         <CreateTask/>
      </div>
   )
}

export default compose(
   withAuthRedirect,
   withProfileRedirect
)(TaskForm_m)