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
                                        isActiveTask
                                     }) => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)


   return (
      <Card size={"big"} pad={"80px"}>
         <div className={styles.wrapper}>
            <div className={styles.textContainer}>
               <p className={styles.title}>{title}</p>
               <p className={styles.description}>Описание</p>
               <p className={styles.info}>{info}</p>
            </div>
            <div className={styles.leftContainer}>
               <img src={VerticalLine} alt=""/>
               <div className={styles.btnContainer}>
                  <div className={styles.cost}>
                     <p className={styles.cost__text}>За задание</p>
                     <p className={styles.cost__rate}>{rate + "₽"}</p>
                  </div>

                  <img src={HorizontalLine} alt=""/>

                  <div className={styles.btn}>
                     <Button mod={"black"} children={"Канал"} br={"14px"}/>
                     <div className={styles.btn__infoContainer}>
                        <Button mod={"grey"} br={"14px"}>
                           <img src={Info} className={styles.btn__infoIcon} alt=""/>
                        </Button>
                     </div>
                  </div>

                  <div className={styles.check}>
                     <Button mod={"gradient"} br={"11px"}>
                        Проверить
                     </Button>
                  </div>

                  <div className={styles.cCont}>
                     <button className={styles.cancel}>Отменить</button>
                  </div>
               </div>
            </div>
         </div>
      </Card>
   )
};