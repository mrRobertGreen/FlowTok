import React, {FC} from 'react';
import styles from "./styles.module.scss"
import WorkBlock from "../../components/Profile_mPage/WorkBlock/WorkBlock";
import NavBar from "../../components/Profile_mPage/NavBar/NavBar";

type PropsType = {
   isDesktop: boolean
}

const Work_m: FC<PropsType> = ({isDesktop}) => {

   return (
      <div className={styles.wrapper}>
         <WorkBlock/>
         <NavBar isDesktop={isDesktop} pageName={"Work"} newTasksNumber={null}/>
      </div>
   )

}

export default Work_m