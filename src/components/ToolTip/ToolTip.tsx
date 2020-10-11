import React, {FC} from "react";
import styles from "./styles.module.scss";
import cross from "../../media/images_new/Cross.svg";
import {ContainerT} from "../../redux/user/user-reducer";
import { useParams } from "react-router";

type PropsT = {
   onClose: () => void
}


export const ToolTip: FC<PropsT> = ({onClose}) => {

    const type = useParams() as ContainerT;

    switch (type) {
        case "small":
            return (
                <div className={styles.wrapper}>
                    <div className={styles.headerContainer}>
                        <p className={styles.header}>Контейнер Small TEU</p>
                        <button className={styles.crossBtn}><img src={cross} style={{width: "12px"}} alt=""/></button>
                    </div>
                    <p className={styles.text}>Высота: 2591 см</p>
                    <p className={styles.text}>Длина: 6059 см</p>
                    <p className={styles.text}>Ширина : 2438 см</p>
                    <p className={styles.text}>Высота проема: 2260 см</p>
                    <p className={styles.text}>Ширина проема: 2339 см</p>
                </div>
            )
        case "large":
            return (
                <div>
                    <div>
                        <p className={styles.header}>Large</p>*!/
                        <button className={styles.crossBtn}><img src={cross} alt=""/></button>
                    </div>
                    <p className={styles.text}>Высота: 2591 см</p>
                    <p className={styles.text}>Длина: 12192</p>
                    <p className={styles.text}>Ширина : 2438 см</p>
                    <p className={styles.text}>Высота проема: 2260 см</p>
                    <p className={styles.text}>Ширина проема: 2339 см</p>
                </div>
            )
        case "refrigerator":
            return (
                <div>
                    <div>
                        <p className={styles.header}>Fridge</p>
                        <button className={styles.crossBtn}><img src={cross} alt=""/></button>
                    </div>
                    <p className={styles.text}>Компрессор: бессальниковый полугерметичный
                        6-ти цилиндровый</p>
                    <p className={styles.text}>Высота: 2591 см</p>
                    <p className={styles.text}>Длина: 12192 см</p>
                    <p className={styles.text}>Ширина : 2438 см</p>
                </div>
            )
        default:
            return (
                <span></span>
            )
    }
}