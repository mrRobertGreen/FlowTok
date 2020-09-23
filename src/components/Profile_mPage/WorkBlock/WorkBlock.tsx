import React, {FC} from "react";
import styles from "./styles.module.scss"
import Nav from "./Nav/Nav";
import {List} from "./List/List";
import {useParams} from "react-router";
import {BlogTaskStatusType} from "../../../redux/user/user-reducer";
import {TaskCard_m} from "../../TaskCard_m/TaskCard_m";

type PropsType = {}

const WorkBlock: FC<PropsType> = () => {
    const {type} = useParams()

    return (
        <div className={styles.wrapper}>
            <Nav taskType={type as BlogTaskStatusType}/>
            <TaskCard_m taskType = {"new"}
                        text = {"."}
                        id = {"1"}
                        title = {"FlowTok"}
                        link = {""}
                        info = {"Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис."}
                        rate = {10}
                        url= {""} />
        </div>
    )

}

export default WorkBlock