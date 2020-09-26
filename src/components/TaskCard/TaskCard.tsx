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

export const TaskCard: FC<PropsT> = ({
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
    //if (taskType == "active") {
    return (
        <Card size={"big"} pad={"80px 28px"}>
            <div className={styles.wrapper}>
                <div className={styles.mainText}>
                    <p className={styles.title}>
                        {title}
                    </p>
                    <div>
                        <p> Описание </p>
                        <p>
                            {info}
                        </p>
                    </div>
                </div>

                <div className={styles.functional}>
                    <div className={styles.cost}>
                        <p>За задание</p>
                        <p>{rate + "₽"}</p>
                    </div>
                    <div className={styles.btn}>

                    </div>
                </div>
            </div>
        </Card>
    )
    //}
}