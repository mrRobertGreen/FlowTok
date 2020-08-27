import React, {FC} from "react";
import styles from "./styles.module.scss"
import classNames from "classnames";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import {NavLink} from "react-router-dom";
import {BlogTaskStatusType} from "../../../../redux/user-reducer";

type PropsType = {
   taskType: BlogTaskStatusType
}

const Nav: FC<PropsType & PropsFromRedux> = ({taskType}) => {

   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <nav className={styles.wrapper}
           style={{width: `${isDesktop ? `${document.body.clientHeight * 0.47229219}px` : "100%"}`}}
      >
         <div className={styles.sections}>
            <NavLink to={"/work/new"} className={classNames(styles.item, {[styles.active]: taskType === "new"})}>
               <div>Активные</div>
            </NavLink>
            <NavLink to={"/work/done"}
                     className={classNames(styles.item, {[styles.active]: taskType === "done"})}>
               <div>Выполненные</div>
            </NavLink>
         </div>
      </nav>
   )

}

const mapDispatchToProps = {}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Nav)