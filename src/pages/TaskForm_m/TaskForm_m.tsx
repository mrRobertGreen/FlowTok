import React, {FC} from "react";
import styles from "./styles.module.scss"
import {withAuthRedirect, withProfileRedirect} from "../../hocs/hocs";
import {compose} from "redux";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {CreateTaskForm} from "../../components/Cabinet_mPage/CreateTaskForm/CreateTaskForm";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {createAdvTask, userActions} from "../../redux/user/user-reducer";

type PropsType = {}

const TaskForm_m: FC<PropsType> = () => {
   const dispatch = useDispatch()
   const isAdvTaskCreated = useSelector((state: RootStateType) => state.user.isAdvTaskCreated)
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <div className={styles.wrapper}>
         <TopNavbar label={"Создание кампании"} isMenu={false} isDesktop={isDesktop}/>
         <CreateTaskForm createAdvTask={(task) => dispatch(createAdvTask(task))}
                         isFetching={isFetching}
                         isAdvTaskCreated={isAdvTaskCreated}
                         setIsAdvTaskCreated={(flag) => dispatch(userActions.setIsAdvTaskCreated(flag))}
         />
      </div>
   )
}

export default compose<FC>(
   withAuthRedirect,
   withProfileRedirect
)(TaskForm_m)