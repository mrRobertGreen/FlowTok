import React, {FC} from "react";
import styles from "./styles.module.scss"
import backArrowIcon from "../../../media/icons/back_arrow_icon.svg"
import {CreateTaskForm} from "./CreateTaskForm/CreateTaskForm";
import {NavLink} from "react-router-dom";
import {RootStateType} from "../../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hocs/hocs";
import {createAdvTask, userActions} from "../../../redux/user-reducer";

type PropsType = {}

const CreateTask: FC<PropsType & PropsFromRedux> = ({createAdvTask, isFetching, isAdvTaskCreated, setIsAdvTaskCreated}) => {
   return (
      <div className={styles.wrapper}>
         {/*<div className={styles.header}>*/}
         {/*   <NavLink to={"/cabinet"}>*/}
         {/*      <img onClick={() => {}} className={styles.backBtn} src={backArrowIcon} alt="back"/>*/}
         {/*   </NavLink>*/}
         {/*   <div className={styles.title}>Создание кампании</div>*/}
         {/*</div>*/}
         <CreateTaskForm createAdvTask={createAdvTask}
                         isFetching={isFetching}
                         isAdvTaskCreated={isAdvTaskCreated}
                         setIsAdvTaskCreated={setIsAdvTaskCreated}
         />
      </div>
   )
}

const mapStateToProps = (state: RootStateType) => ({
   isFetching: state.app.isFetching,
   isAdvTaskCreated: state.user.isAdvTaskCreated
});

const mapDispatchToProps = {
   createAdvTask,
   setIsAdvTaskCreated: userActions.setIsAdvTaskCreated
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<FC>(
   connector,
   withAuthRedirect,
)(CreateTask)


