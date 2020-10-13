import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.scss";

type PropsT = {
    isSupport: boolean,
    message: string
}

export const Message: FC<PropsT> = ({isSupport, message}) => {
    const {t} = useTranslation();



    return (
        <div className={styles.wrapper}>
            <div className={styles.container}
                 style={isSupport ? {textAlign:"right"} : {textAlign: "left"}}>
                <p className={styles.author}>
                    { isSupport ? t("support-author-text") : t("you-author-text") }
                </p>
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    )
}