import React, {FC} from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import {ContainerT, BlogTaskType} from "../../../../redux/user/user-reducer";
import {Card} from "../../../Card/Card";
import Button from "../../../Button/Button";
import Info from "../../../../media/icons/info.svg";
import Line from "../../../../media/icons/line.svg";
import {Separator} from "../../../Separator/Separator";

type PropsT = {
   taskType: ContainerT
   isActiveTask: boolean
} & BlogTaskType

export const TaskCard_m: FC<PropsT> = ({
                                          taskType, // done - если выполнена, new - если нет
                                          text, // если задание не со звуком, то ставишь этот текст на кнопку
                                          id,
                                          isActive,
                                          title, // название таски
                                          link, // передается, если это задание со звуком
                                          info, // описание таски
                                          rate, // стоимость таски
                                          url, // передается, если это задание НЕ со звуком
                                          isActiveTask// существует активная таска
                                       }) => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return <></>
};