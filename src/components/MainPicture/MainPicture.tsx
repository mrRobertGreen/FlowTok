import React, {FC} from "react";
import styles from "./styles.module.scss";
import menKitchen from "../../media/images/menKitchen.svg";
import wmenFence from "../../media/images/wmenFence.svg";
import yellowWmen from "../../media/images/yellowWmen.svg";
import mainPic from "../../media/images/mainPicture.svg"


type PropsT = {
    isDesktop: boolean
}

export const MainPicture: FC<PropsT> = (isDesktop) => {
    if (isDesktop) {
        return (
            <div className={styles.wrapper}>
                <img src={mainPic} alt="" width={"100%"}/>
            </div>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                <img src={menKitchen} className={styles.menKitchen} alt=""/>
                <div className={styles.blueSquare}></div>
                <div className={styles.lilacPCircle}></div>
                <div className={styles.purplePCircle}></div>
                <img src={wmenFence} className={styles.wmenFence} alt=""/>
                <img src={yellowWmen} className={styles.yellowWmen} alt=""/>
                <div className={styles.bigIron}></div>
                <div className={styles.circle}></div>
            </div>
        )
    }
}