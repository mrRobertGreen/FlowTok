import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {BlogTaskStatusType, BlogTaskType} from "../../redux/user/user-reducer";
import {Card} from "../Card/Card";
import Button from "../Button/Button";
import {Separator} from "../Separator/Separator";

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
                <div className={styles.cost}>
                    <p className={styles.cost__text}>За задание</p>
                    <p>{rate}</p>
                </div>
                <hr color={"black"}/>
                <div className={styles.btn}>
                    <div className={styles.chanel}>
                        <Button mod={"whiteGradient"} br={"11px"}>Канал</Button>
                    </div>
                    <div className={styles.check}>
                        <Button mod={"gradient"} br={"11px"}>Проверить</Button>
                    </div>
                </div>
                <button className={styles.cancel}>Отменить</button>
            </div>
        </Card>
    )
}