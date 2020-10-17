import React, {FC, useState} from "react";
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";
import Modal from "../common/Modal/Modal";
import cross from "../../media/images_new/Cross.svg";
import Button from "../Button/Button";
import {ContainerBuy} from "../ContainerBuy/ContainerBuy";

type PropsT = {
   onClose: () => void
}


export const Notification: FC<PropsT> = ({onClose}) => {
   const {t} = useTranslation();
   const [isModal, setIsModal] = useState(false)

   return (
      <div className={styles.wrapper}>
         <Modal isOpen={isModal}>
            <ContainerBuy onClose={() => setIsModal(false)}/>
         </Modal>
         <div className={styles.container}>
            <div className={styles.cross_container}>
               <button className={styles.cross} onClick={onClose}>
                  <img src={cross} alt=""/>
               </button>
            </div>
            <div className={styles.title}>
               {t("dear-user-text")}
            </div>
            <div className={styles.text}>
               {t("we-saw-text")}
            </div>
            <Button mod={"green"} m={"17px 0 0 0"} onClick={() => {setIsModal(true)
                                                                     onClose()}}>
               {t("buy-btn")}
            </Button>
         </div>
      </div>
   )
}