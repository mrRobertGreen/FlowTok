import React, {FC} from "react";
import styles from "./styles.module.scss";

type PropsT = {
    isOpen: boolean
}

export const TimeChangeMenu: FC<PropsT> = ({isOpen}) => {
    if (isOpen)
        return (
            <div className={styles.wrapper}>
                <button className={styles.container}>
                    День
                </button>
                <button className={styles.container}>
                    Неделя
                </button>
                <button className={styles.container}>
                    Месяц
                </button>
            </div>
        )
    else
        return <span></span>
}