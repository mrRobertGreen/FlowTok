import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../../redux/store";
import {BlogTaskStatusType, BlogTaskType} from "../../../../../redux/user/user-reducer";
import {Card} from "../../../../Card/Card";
import Button from "../../../../Button/Button";
import HorizontalLine from "../../../../../media/icons/HorisontalLine.svg";
import VerticalLine from "../../../../../media/icons/VerticalLine.svg";
import Info from "../../../../../media/icons/blackInfo.svg"
import {Separator} from "../../../../Separator/Separator";

/*
* Карточка задания
*
* В качестве примера смотри компонент components/Profile_mPage/WorkBlock/TaskList/ListItem
* */


type PropsT = {
    taskType: BlogTaskStatusType
    isActiveTask: boolean
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
                                         isActiveTask,
                                         isActive,
                                     }) => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

    if (taskType === "new") {
        return (
            <>
                <div className={styles.card}
                     style={{opacity: isActiveTask && !isActive && taskType === "new" ? "0.5" : ""}}>
                    <div className={styles.wrapper}>
                        <div className={styles.textContainer}>
                            <p className={styles.title}>{title}</p>
                            <p className={styles.description}>Описание</p>
                            <p className={styles.info}>{info}</p>
                        </div>
                        <div className={styles.leftContainer}>
                            <img src={VerticalLine} alt="" className={styles.vertLine}/>
                            <div className={styles.btnContainer}>
                                <div className={styles.cost}>
                                    <p className={styles.cost__text}>За задание</p>
                                    <p className={styles.cost__rate}>{rate + "₽"}</p>
                                </div>

                                <img src={HorizontalLine} alt=""/>

                                <div className={styles.btn}>
                                    <Button mod={"black"} children={"Канал"} br={"14px"}/>
                                    <div className={styles.btn__infoContainer}>
                                        <Button mod={"grey"} br={"14px"} p={"10px"}>
                                            <img src={Info} className={styles.btn__infoIcon} alt=""/>
                                        </Button>
                                    </div>
                                </div>

                                <div className={styles.check}>
                                    <Button mod={"gradient"} br={"11px"}>
                                        {isActive && "Проверить"}
                                        {!isActive && "Выполнить"}
                                    </Button>
                                </div>

                                {isActive && <div className={styles.cCont}>
                                    <Button mod={"red"} br={"11px"}>
                                        Отменить
                                    </Button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                {isActive && <div className={styles.message}>
                    Выполните текущее задание, чтобы перейти к следющему
                </div>}
            </>
        )
    } else {
        return (
            <>
                <div className={styles.card}>
                    <div className={styles.wrapper}>
                        <div className={styles.container}>
                            <div className={styles.header}>
                                <p className={styles.title}>{title}</p>
                                <p className={styles.date}>Сегодня</p>
                            </div>

                            <p className={styles.description}>Описание</p>
                            <p className={styles.info}>{info}</p>

                            <Separator m={"20px 0 20px 0"}/>
                            <div className={styles.header}>
                                <p className={styles.get}>Получено за задание</p>
                                <p className={styles.money}>120 ₽</p>
                            </div>
                        </div>

                    </div>
                </div>
                {isActive && <div className={styles.message}>
                    Выполните текущее задание, чтобы перейти к следющему
                </div>}
            </>
        )
    }
};