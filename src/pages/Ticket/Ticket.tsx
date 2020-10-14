import React, {FC, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.scss"
import {Page} from "../../components/Page/Page";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {Message} from "../../components/Support/Message/Message";
import {Input} from "../../components/Input/Input";
import {validateRequiredField} from "../../utils/validators";
import {Field, FieldProps, Form} from "formik";
import Button from "../../components/Button/Button";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {getTicketMessages, sendTicketMessage} from "../../redux/user/user-reducer";
import {smartRound} from "../../utils/realTimeData";
import {SendTicketMessageReqBodyT} from "../../api/user-api";

type PropsT = {
   theme?: string,
   isOpened?: boolean
};

export const Ticket: FC<PropsT> = ({theme}) => {
   const {t} = useTranslation();

   const dispatch = useDispatch()
   const messages = useSelector((state: RootStateType) => state.user.ticketMessages)
   const [inputValue, setInputValue] = useState("")
   const [inputError, setInputError] = useState("")
   const {id} = useParams()

   const messagesEndRef = useRef<HTMLDivElement>(null)

   const scrollToBottom = () => {
      if (messagesEndRef.current) {
         messagesEndRef.current.scrollIntoView({behavior: "smooth"})
      }
   }
   
   useEffect(() => {
      dispatch(getTicketMessages(id))
   }, [])

   useEffect(() => {
      scrollToBottom()
   }, [messages])

   const onSendMessage = () => {
      if (inputValue) {
         const payload: SendTicketMessageReqBodyT = {
            text: inputValue,
            ticketId: id,
         }
         dispatch(sendTicketMessage(payload))
         setInputValue("")
      } else {
         setInputError("Это поле не может быть пустым")
      }

   }
   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setInputValue(e.target.value)
   }


   return (
      <Page bg={"#E5E5EA"}>
         <TopNavbar label={t("support-title")} subLabel={t("support-subTitle")}/>
         <div className={styles.messages}>
            {messages?.map((item, idx) => (
               <Message isSupport={item.who === "operator"}
                        message={item.text}/>
            ))}
            <div ref={messagesEndRef} />
         </div>
         <div className={styles.stick}>
            <div className={styles.container}>
               <div className={styles.text_square}>
                  <div className={styles.input}>
                     <Input mod={"white"}
                            br={"11px"}
                            isError={!!inputError}
                            errorMessage={inputError}
                            value={inputValue}
                            onChange={onChangeInput}
                            placeholder={t("support-form-message")}/>
                  </div>

                  <Button mod={"gradient"} onClick={onSendMessage}>{t("send-btn")}</Button>
               </div>
            </div>
         </div>
      </Page>
   )
}