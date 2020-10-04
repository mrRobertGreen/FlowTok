import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import {ContainerT, BlogTaskType} from "../../../../redux/user/user-reducer";
import Button from "../../../Button/Button";
import HorizontalLine from "../../../../media/icons/HorisontalLine.svg";
import VerticalLine from "../../../../media/icons/VerticalLine.svg";
import Info from "../../../../media/icons/blackInfo.svg"
import {Separator} from "../../../Separator/Separator";

/*
* Карточка задания
*
* В качестве примера смотри компонент components/Profile_mPage/WorkBlock/ConatinersList/ListItem
* */


type PropsT = {
   taskType: ContainerT
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

   return <></>
};