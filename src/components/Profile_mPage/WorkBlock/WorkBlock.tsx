import React, {FC} from "react";
import Nav from "./Nav/Nav";
import {useParams} from "react-router";
import {BlogTaskStatusType} from "../../../redux/user/user-reducer";
import {TaskCard_m} from "../../TaskCard_m/TaskCard_m";
import {Page} from "../../Page/Page";
import TopNavbar from "../../TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";

type PropsType = {}

const WorkBlock: FC<PropsType> = () => {
   const {type} = useParams()
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <Page>
         {!isDesktop && <TopNavbar label={"Задания"} logo={true}/>}
         {/*<Nav taskType={type as BlogTaskStatusType}/>*/}
         <TaskCard_m taskType={"new"}
                     text={"."}
                     id={"1"}
                     title={"FlowTok"}
                     link={""}
                     info={"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                     rate={10}
                     url={""}/>
      </Page>
   )

}

export default WorkBlock