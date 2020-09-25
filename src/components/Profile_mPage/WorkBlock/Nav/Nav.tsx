import React, {FC, useEffect, useRef} from "react";
import styles from "./styles.module.scss"
import classNames from "classnames";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import {NavLink} from "react-router-dom";
import {BlogTaskStatusType} from "../../../../redux/user/user-reducer";

type PropsType = {
   taskType: BlogTaskStatusType
}

const Nav: FC<PropsType & PropsFromRedux> = ({taskType}) => {

   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   const sliderItem = useRef<HTMLDivElement>(null)


   useEffect(() => {
      const div = sliderItem.current
      if (div) {
         if (taskType === "new") {
            div.classList.remove(`${styles.sliderItemR}`)
         } else {
            div.classList.add(`${styles.sliderItemR}`)
         }
      }
   }, [taskType])

   return (
      <nav className={styles.wrapper}>
         <div className={styles.sections}>
            <div className={styles.sliderItemL} ref={sliderItem}/>
            <NavLink to={"/work/new"}
                     className={classNames(styles.item, {[styles.active]: taskType === "new"})}>
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