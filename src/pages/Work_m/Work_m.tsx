import React, {FC} from 'react';
import styles from "./styles.module.scss"
import WorkBlock from "../../components/Profile_mPage/WorkBlock/WorkBlock";
import NavBar_m from "../../components/NavBar_m/NavBar_m";
import {compose} from 'redux';
import {withAuthRedirect, withTaskRedirect} from "../../hocs/hocs";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Page} from "../../components/Page/Page";

type PropsType = {}

const Work_m: FC<PropsType> = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return (
      <Page bg={"#E5E5EA"}>
         <WorkBlock/>
         <NavBar_m pageName={"Work"} newTasksNumber={null}/>
      </Page>
   )

}

export default compose<FC>(
   withTaskRedirect,
   // withAuthRedirect
)(Work_m)