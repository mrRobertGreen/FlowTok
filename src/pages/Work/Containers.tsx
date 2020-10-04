import React, {FC} from 'react';
import WorkBlock from "../../components/Profile_mPage/WorkBlock/WorkBlock";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Page} from "../../components/Page/Page";
import styles from "../../components/Profile_mPage/WorkBlock/styles.module.scss";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import Nav from "../../components/Profile_mPage/WorkBlock/Nav/Nav";
import {ContainerT} from "../../redux/user/user-reducer";
import {TaskList} from "../../components/Profile_mPage/WorkBlock/TaskList/TaskList";
import {useParams} from "react-router";

type PropsType = {}

export const Containers: FC<PropsType> = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   const type = useParams() as ContainerT

   return (
      <Page bg={"#E5E5EA"} isNavbar={true} pageName={"Work"}>
         <div className={styles.container}>
            {!isDesktop && <TopNavbar label={"Задания"} logo={true}/>}
            <Nav type={"small"}/>
            {/*<TaskList/>*/}
         </div>
      </Page>
   )
}
