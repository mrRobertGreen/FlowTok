import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Button from "../../../Button/Button";
import Modal from "../../../common/Modal/Modal";
import {History} from "../History/History";
import {HistoryItemT, WithdrawReqBodyT} from "../../../../api/user-api";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import {smartRound} from "../../../../utils/realTimeData";
import {WithdrawalModal} from "../../../WithdrawalModal/WithdrawalModal";
import {withdraw} from "../../../../redux/user/user-reducer";


export type PropsType = {
   value: number
   history?: Array<HistoryItemT>
   isAdmin: boolean
}

const Balance: FC<PropsType> = ({value, history, isAdmin}) => {

   const cy = useSelector((state: RootStateType) => state.app.cy)
   const lang = useSelector((state: RootStateType) => state.app.lang)
   const [isModal, setIsModal] = useState(false)
   const [isModalAdd, setIsModalAdd] = useState(false)
   const dispatch = useDispatch()

   const {t} = useTranslation()

   const onOpenForm = () => {
      if (isAdmin) {
         const payload: WithdrawReqBodyT = {
            cy: cy,
            all: true,
            lang: lang,
         }
         dispatch(withdraw(payload))
      } else {
         setIsModal(true)
      }
   }

   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         <Modal isOpen={isModal}>
            <WithdrawalModal balance={value} onClose={() => setIsModal(false)} isAdd={false}/>
         </Modal>
         <Modal isOpen={isModalAdd}>
            <WithdrawalModal balance={value} onClose={() => setIsModalAdd(false)} isAdd={true} />
         </Modal>
         <div className={styles.main}>
            <div>
               <div className={styles.title}>
                  {t("balance-title")}
               </div>
               <div className={styles.label}>
                  {t("balance")}
               </div>
               <div className={styles.money}>
                  {smartRound(value)}{cy === "RUB" ? "₽" : "$"}
               </div>
            </div>

            <div className={styles.btn} data-test={"btn"}>
               <div className={styles.btn__first}>
                  <Button data-test={"btn"}
                          mod={"green"}
                          onClick={() => setIsModalAdd(true)}
                  >
                     {t("balance-payin")}
                  </Button>
               </div>
               <div className={styles.btn__second}>
                  <Button data-test={"button"}
                          mod={"gradient"}
                          onClick={onOpenForm}
                  >{t("balance-payoff")}</Button>
               </div>
            </div>

            <History history={history}/>
         </div>
      </div>
   )
}

export default Balance