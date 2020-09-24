import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {BlogTaskStatusType, BlogTaskType} from "../../redux/user/user-reducer";
import {Card} from "../Card/Card";
import Button from "../Button/Button";
import Info from "../../media/icons/info.svg";
import Line from "../../media/icons/line.svg";

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
        <Card size={"small"} pad={"10px"}>
            <div className={styles.wrapper}>
                <div className={styles.titleContainer}>
                    <p className={styles.title}>{title}</p>
                    <button className={styles.info_icon}>
                        <img src={Info} alt="info"/>
                    </button>
                </div>
                <p className={styles.info}>{info}</p>
                <img src={Line} className={styles.borderLine} alt=""/>

                <div className={styles.cost}>
                    <p className={styles.cost__text}>За задание</p>
                    <div className={styles.cost__green_cont}><p className={styles.rate}>{rate + "₽"}</p></div>
                </div>

                <img src={Line} className={styles.borderLine} alt=""/>
                <div className={styles.btn}>

                    <button className={styles.btn__chanel}>
                        Канал
                    </button>

                    <div className={styles.btn__check}>
                        <Button mod={"gradient"} br={"11px"}>
                            Проверить
                        </Button>
                    </div>
                </div>
                <div className={styles.cCont}>
                    <button className={styles.cancel}>Отменить</button>
                </div>
            </div>
        </Card>
    )
};