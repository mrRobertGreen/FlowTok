import React, {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.scss"
import Button from "../../Button/Button";
import {Separator} from "../../Separator/Separator";
import {NavLink} from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import {TicketForm} from "../TicketForm/TicketForm";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {getTickets} from "../../../redux/user/user-reducer";

export const TicketList: FC = () => {
   const {t} = useTranslation();

   const tickets = useSelector((state: RootStateType) => state.user.tickets)
   const [isForm, setIsForm] = useState(false)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getTickets())
   }, [])

   return (
      <div className={styles.wrapper}>
         <Modal isOpen={isForm}>
            <TicketForm onClose={() => setIsForm(false)}/>
         </Modal>
         <div className={styles.appeal}>
            <p className={styles.appeal__title}>{t("your-appeal-title")}</p>
         </div>
         <div className={styles.columns}>
            <div className={styles.title_container}>
               <p className={styles.columns__title}>{t("theme-text")}</p>
               <p className={styles.columns__title}>{t("message-text")}</p>
               <p className={styles.columns__title}>{t("status-text")}</p>
            </div>
            <div className={styles.main}>
               {tickets?.map((item, idx) => (
                  <NavLink to={`/ticket/${item.id}`}>
                     <div className={styles.ticket_container}>
                        <p className={styles.theme}>{item.title}</p>
                        <p className={styles.message_count}>{item.messages}</p>
                        <p className={styles.status}>{item.status}</p>
                     </div>
                     <Separator m={"10px"}/>
                  </NavLink>
               ))}
            </div>
         </div>
         <div className={styles.button}>
            <Button
               onClick={() => setIsForm(true)}
               mod={"gradient"}
               children={t("create-ticket-btn")}/>
         </div>
      </div>

   )
}