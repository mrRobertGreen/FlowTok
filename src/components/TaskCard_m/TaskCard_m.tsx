import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {BlogTaskStatusType, BlogTaskType} from "../../redux/user/user-reducer";
import {Card} from "../Card/Card";

/*
* Карточка задания
*
* В качестве примера смотри компонент components/Profile_mPage/WorkBlock/List/ListItem
* */


type PropsT = {
    taskType: BlogTaskStatusType
} & BlogTaskType

export const TaskCard_m: FC<PropsT> = ({
                                           taskType, // done - если выполнена, new - если нет, active - если в процессе
                                           text, // если задание не со звуком, то ставишь этот текст на кнопку
                                           id,
                                           title, // название таски
                                           link, // передается, если это задание со звуком
                                           info, // описание таски
                                           rate, // стоимость таски
                                           url, // передается, если это задание НЕ со звуком
                                       }) => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

    return (
        <Card pad={"10px"}>
            <div className={styles.wrapper}>
                <p className={styles.title}>{title}</p>
                <p className={styles.info}>{info}</p>
                <hr color={"black"}/>
                <div>
                    <p className={styles.cost}>За задание</p>
                </div>
                <hr color={"black"}/>

            </div>
        </Card>
    )
}