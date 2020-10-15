import React, {FC} from "react";
import styles from "./styles.module.scss";
import cross from "../../media/images_new/Cross.svg";
import {useTranslation} from "react-i18next";
import {WithdrawForm} from "../forms/WithdrawForm/WithdrawForm";

type PropsT = {
   balance: number
   onClose: () => void
}

export const WithdrawalModal: FC<PropsT> = ({balance, onClose}) => {
   const {t} = useTranslation();
   return (
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <p className={styles.title}>{t("withdraw-title")}</p>
            <button style={{backgroundColor: "white"}} className={styles.cross} onClick={onClose}>
               <img src={cross} alt=""/>
            </button>
         </div>
         <p className={styles.add}>{t("add-text")}</p>
         <WithdrawForm balance={balance} onClose={onClose}/>
      </div>
   )
}