import React, {FC} from "react";
import styles from "./styles.module.scss"
import playIcon from "../../../../media/icons/play_icon.svg"
import pauseIcon from "../../../../media/icons/pause_icon.svg"
import replyIcon from "../../../../media/icons/reply_icon.svg"
import likeIcon from "../../../../media/icons/like_icon.svg"
import eyeIcon from "../../../../media/icons/eye_icon.svg"
import plusIcon from "../../../../media/icons/plus_icon.svg"
import {AdvTaskStatusType} from "../../../../redux/user-reducer";
import {NavLink} from "react-router-dom";

type PropsType = {
   title: string
   info: string
   value: number
   clips: number
   reposts: string
   views: string
   likes: string
   id: string
   state: "play" | "pause"
   changeAdvTaskStatus: (taskId: string, taskStatus: AdvTaskStatusType) => Promise<void>
}

const CampaignItem: FC<PropsType> = ({
                                        value,
                                        state,
                                        info,
                                        clips,
                                        likes,
                                        reposts,
                                        title,
                                        views,
                                        changeAdvTaskStatus,
                                        id
                                     }) => {
   const onChangeTaskStatus = async () => {
      if (state === "pause") {
         await changeAdvTaskStatus(id, "play")
      } else {
         await changeAdvTaskStatus(id, "pause")
      }
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.topBlock}>
            <div className={styles.label}>
               {title}
            </div>
            <div className={styles.description}>
               {info}
            </div>
            <img src={state === "play" ? pauseIcon : playIcon}
                 alt=""
                 className={styles.control}
                 onClick={onChangeTaskStatus}/>
         </div>
         <div className={styles.bottomBlock}>
            <div className={styles.detail}>
               <div className={styles.label}>
                  Оставшийся баланс:
               </div>
               <div className={styles.number}>
                  {value}₽
                  <NavLink to={`/push_balance/${id}`}>
                     <img className={styles.plus} src={plusIcon} alt=""/>
                  </NavLink>
               </div>

            </div>
            <div className={styles.line}/>
            <div className={styles.detail}>
               <div className={styles.label}>
                  Снято клипов:
               </div>
               <div className={styles.number}>
                  {clips}
               </div>
            </div>
            <div className={styles.stats}>
               <div className={styles.item}>
                  <img src={replyIcon} alt="" className={styles.icon}/>
                  <div>{reposts}</div>
               </div>
               <div className={styles.item}>
                  <img src={eyeIcon} alt="" className={styles.icon}/>
                  <div>{views}</div>
               </div>
               <div className={styles.item}>
                  <img src={likeIcon} alt="" className={styles.icon}/>
                  <div>{likes}</div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CampaignItem