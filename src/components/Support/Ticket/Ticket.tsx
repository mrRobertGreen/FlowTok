import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.scss"

export const Ticket: FC = () => {
   const {t} = useTranslation();

   return (
      <div className={styles.wrapper}>

      </div>

   )
}