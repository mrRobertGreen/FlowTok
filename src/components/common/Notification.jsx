import React from "react";
import styles from "./Notification.module.scss";

const Notification = ({notificationText, close}) => {
    return ( 
        <div className={styles.main}>
            <p className={styles.txt}>{notificationText}</p>
            <button color="white" className={styles.button} onClick={close}>&times;</button>
        </div>
    )
};

export default Notification;