import React, {FC} from "react";
import styles from "./styles.module.scss"
import Button from "../../../../Button/Button";
import {ContainerT, BlogTaskType} from "../../../../../redux/user/user-reducer";

type PropsType = {
   taskType: ContainerT
   doBlogTask: (id: string) => void
} & BlogTaskType

const ListItem: FC<PropsType> = ({
                                    title,
                                    rate,
                                    info,
                                    id,
                                    link,
                                    taskType,
                                    doBlogTask,
                                    url,
                                    text
                                 }) => {

   const doTask = () => {
      doBlogTask(id)
   }
   return (
      <div className={styles.wrapper}>

      </div>
   )
}

export default ListItem