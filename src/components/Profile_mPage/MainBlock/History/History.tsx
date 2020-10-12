import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss";
import {Separator} from "../../../Separator/Separator";
import cross from "../../../../media/images_new/Cross.svg";
import {HistoryItemT} from "../../../../api/user-api";
import {useDispatch} from "react-redux";
import {getHistory} from "../../../../redux/user/user-reducer";
import {useTranslation} from "react-i18next";

export type PropsType = {
   history?: Array<HistoryItemT>
}

export const History: FC<PropsType> = ({
                                          history = []
                                       }) => {

   const {t} = useTranslation()

   if (!history || history.length === 0) return <></>

   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         {/*<div className={styles.crossContainer}>*/}
         {/*   <button className={styles.cross} onClick={() => onClose(false)}>*/}
         {/*      <img src={cross} alt=""/>*/}
         {/*   </button>*/}
         {/*</div>*/}
         <div className={styles.title}>
            {t("history-title")}
         </div>
         <div className={styles.history}>
            {history.map(h => (
               <div>
                  <div className={styles.historyItem}>
                     <div className={styles.row}>
                        <div className={h.sign === 1 ? styles.operation_green : styles.operation_red}>
                           {h.sign === 1 && "+"}{h.sign * h.value}₽
                        </div>
                        <div className={styles.type}>
                           {h.type}
                        </div>
                     </div>
                     <div className={styles.date}>
                        {h.date}
                     </div>
                  </div>
                  <Separator m={"0 0 10px"}/>
               </div>
            ))}
         </div>
      </div>
   )
}