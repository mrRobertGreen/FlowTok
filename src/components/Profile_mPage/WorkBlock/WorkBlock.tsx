import React, {FC} from "react";
import Nav from "./Nav/Nav";
import {useParams} from "react-router";
import {BlogTaskStatusType} from "../../../redux/user/user-reducer";
import {TaskCard_m} from "../../TaskCard_m/TaskCard_m";
import {Page} from "../../Page/Page";
import TopNavbar from "../../TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {Task} from "../../TaskCard/TaskCard";

type PropsType = {}

const WorkBlock: FC<PropsType> = () => {
    const {type} = useParams()
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
    if (isDesktop) {
        return (
            <div>
                {!isDesktop && <TopNavbar label={"Задания"} logo={true}/>}
                <Nav taskType={type as BlogTaskStatusType}/>
                <div style={{marginTop: ""}}>
                    <Task taskType={"new"} id={"1"}
                          title={"FlowTok"}
                          info={"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                          rate={10}/>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {!isDesktop && <TopNavbar label={"Задания"} logo={true}/>}
                <Nav taskType={type as BlogTaskStatusType}/>
                <div style={{marginTop: ""}}>
                    <Task taskType={"new"} id={"1"}
                          title={"FlowTok"}
                          info={"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                          rate={10}/>
                    <TaskCard_m taskType={"new"}
                                text={"."}
                                id={"1"}
                                title={"FlowTok"}
                                link={""}
                                info={"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                                rate={10}
                                url={""}/>
                    <TaskCard_m taskType={"new"}
                                text={"."}
                                id={"1"}
                                title={"FlowTok"}
                                link={""}
                                info={"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                                rate={10}
                                url={""}/>
                    <TaskCard_m taskType={"new"}
                                text={"."}
                                id={"1"}
                                title={"FlowTok"}
                                link={""}
                                info={"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                                rate={10}
                                url={""}/>
                    <TaskCard_m taskType={"new"}
                                text={"."}
                                id={"1"}
                                title={"FlowTok"}
                                link={""}
                                info={"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                                rate={10}
                                url={""}/>
                    <TaskCard_m taskType={"new"}
                                text={"."}
                                id={"1"}
                                title={"FlowTok"}
                                link={""}
                                info={"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                                rate={10}
                                url={""}/>
                    <TaskCard_m taskType={"new"}
                                text={"."}
                                id={"1"}
                                title={"FlowTok"}
                                link={""}
                                info={"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                                rate={10}
                                url={""}/>
                </div>
            </div>
        )
    }
}

export default WorkBlock