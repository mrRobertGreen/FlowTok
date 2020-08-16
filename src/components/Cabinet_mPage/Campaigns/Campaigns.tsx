import React, {FC} from "react";
import styles from "./styles.module.scss"
import CampaignItem from "./CampaignItem/CampaignItem";
import {AdvTaskStatusType, AdvTaskType} from "../../../redux/user-reducer";

type PropsType = {
   tasks: Array<AdvTaskType>
   changeAdvTaskStatus: (taskId: string, taskStatus: AdvTaskStatusType) => Promise<void>
}

const Campaigns: FC<PropsType> = ({tasks, changeAdvTaskStatus}) => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.title}>
            Активные кампании
         </div>
         {tasks.map((t) => (
            <CampaignItem
               id={t.id}
               key={t.id}
               value={t.value}
               title={t.title}
               clips={t.clips}
               info={t.info}
               likes={t.likes}
               reposts={t.reposts}
               state={t.state}
               views={t.views}
               changeAdvTaskStatus={changeAdvTaskStatus}
            />
         ))}
      </div>
   )
}

export default Campaigns