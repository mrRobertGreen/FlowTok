import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss"
import ListItem from "./ListItem/ListItem";
import {RootStateType} from "../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {BlogTaskStatusType, BlogTaskType, doBlogTask, getBlogTasks} from "../../../../redux/user/user-reducer";
import Preloader from "../../../common/Preloader/Preloader";
import {useCache} from "../../../../hooks/useCache";
import {TaskCard} from "./TaskCard/TaskCard";
import {TaskCard_m} from "./TaskCard_m/TaskCard_m";
import noTaskImg from "../../../../media/images/noTask.svg"
import {getBlogNewFilteredTasks} from "../../../../redux/user/selectors";
import {Container} from "../../../Container/Container";
import {Purchase} from "../../../Purchase/Purchase";

type PropsType = {
    taskType: BlogTaskStatusType
}

export const TaskList: FC<PropsType> = ({
                                            taskType,
                                        }) => {
    const dispatch = useDispatch()
    let newTasks = useSelector(getBlogNewFilteredTasks)
    // const isActiveTask = !!useSelector((state: RootStateType) => state.user.task)
    const isActiveTask = true
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
    let doneTasks = useSelector((state: RootStateType) => state.user.blogDoneTasks)
    const doneTasksCache = useCache("blogDoneTasks")
    const isAuth = useSelector((state: RootStateType) => state.auth.isAuth)
    const isFetching = useSelector((state: RootStateType) => state.app.isFetching)

    useEffect(() => { // if current section is changed get necessary tasks
        dispatch(getBlogTasks(taskType))
    }, [taskType, dispatch])

    if (!doneTasks || doneTasks.length === 0) {
        // doneTasks = doneTasksCache
        doneTasks = [
            {
                title: "FlowTok",
                rate: 10,
                link: "link",
                info: "Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис.",
                id: "123",
                url: "",
                text: "",
            }
        ]
    }
    if (newTasks?.length === 0) {
        newTasks = [
            {
                title: "FlowTok",
                rate: 10,
                link: "link",
                info: "Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис.",
                id: "123",
                url: "",
                text: "",
                isActive: true,
            },
            {
                title: "FlowTok",
                rate: 10,
                link: "link",
                info: "Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис.",
                id: "1234",
                url: "",
                text: "",
            },
            {
                title: "FlowTok",
                rate: 10,
                link: "link",
                info: "Подпишитесь на официальный канал FlowTok для того, чтобы следить за последними новостями. Так же будем рассказывать как работает наш сервис.",
                id: "12354",
                url: "",
                text: ""
            },
        ]
    }
    // if (!isAuth) {
    //    return <Redirect to="/login"/>
    // }
    if (taskType === "new" && !newTasks) {
        return <Preloader/>
    }
    if (taskType === "done" && !doneTasks) {
        return <Preloader/>
    }
    // if (isFetching) {
    //     return <Preloader/>
    // }

    if (newTasks && taskType === "new" && newTasks.length === 0) {
        return (
            <div className={styles.message}>
                <img src={noTaskImg} alt="" className={styles.noTaskImg}/>
                <p className={styles.title}>Здесь пока ничего нет</p>
                <p className={styles.desc}>Мы сообщим Вам, как только появятся актульные задания</p>
            </div>
        )
    }
    if (doneTasks && taskType === "done" && doneTasks.length === 0) {
        return <div className={styles.message}>Заданий пока нет...</div>
    }

    const getTasks = () => {
        if (taskType === "new" && newTasks) {
            return newTasks
        }
        if (taskType === "done" && doneTasks) {
            return doneTasks
        }
        return [] as Array<BlogTaskType>
    }

    if (isDesktop) {
        return (
            <div className={styles.wrapper}>
                {/*{getTasks().map(task => (*/}
                {/*    <TaskCard*/}
                {/*        key={task.id}*/}
                {/*        id={task.id}*/}
                {/*        title={task.title}*/}
                {/*        info={task.info}*/}
                {/*        rate={task.rate}*/}
                {/*        link={task.link}*/}
                {/*        text={task.text}*/}
                {/*        url={task.url}*/}
                {/*        taskType={taskType}*/}
                {/*        isActive={task.isActive}*/}
                {/*        isActiveTask={isActiveTask}*/}
                {/*        // doBlogTask={(id: string) => dispatch(doBlogTask(id))}*/}
                {/*    />*/}
                {/*))}*/}
                <Container/>

            </div>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                {/*{getTasks().map(task => (*/}
                {/*    <TaskCard_m*/}
                {/*        key={task.id}*/}
                {/*        id={task.id}*/}
                {/*        title={task.title}*/}
                {/*        info={task.info}*/}
                {/*        rate={task.rate}*/}
                {/*        link={task.link}*/}
                {/*        text={task.text}*/}
                {/*        url={task.url}*/}
                {/*        isActive={task.isActive}*/}
                {/*        taskType={taskType}*/}
                {/*        isActiveTask={isActiveTask}*/}
                {/*        // doBlogTask={(id: string) => dispatch(doBlogTask(id))}*/}
                {/*    />*/}
                {/*))}*/}
                <div className={styles.container}>
                    <Container isInformed={true}/>
                    <Purchase/>
                </div>
            </div>
        )
    }
}