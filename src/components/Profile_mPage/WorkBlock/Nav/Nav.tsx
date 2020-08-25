import React, {FC} from "react";
import styles from "./styles.module.scss"
import classNames from "classnames";
import {SectionNames} from "../WorkBlock";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";

type PropsType = {
   currentSection: SectionNames
   setCurrentSection: (section: SectionNames) => void
}

const Nav: FC<PropsType & PropsFromRedux> = ({setCurrentSection, currentSection}) => {

   const onClickNewSection = () => {
      setCurrentSection("new")
   }
   const onClickDoneSection = () => {
      setCurrentSection("done")
   }
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <nav className={styles.wrapper}
           style={{width: `${isDesktop ? `${document.body.clientHeight * 0.47229219}px` : "100%"}`}}
      >
         <div className={styles.sections}>
            <div
               className={classNames(styles.item, {[styles.active]: currentSection === "new"})}
               onClick={onClickNewSection}
            >
               <div>Активные</div>
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
}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Nav)