import React, {FC} from "react";
import styles from "./styles.module.scss";
import cross from "../../media/images_new/Cross.svg";
import {ContainerT} from "../../redux/user/user-reducer";
import {useParams} from "react-router";

type PropsT = {
    onClose: () => void,
    ref?: string
}


export const ToolTip: FC<PropsT> = ({onClose, ref}) => {

    // @ts-ignore
    const {type} = useParams() as ContainerT;

    if (ref !== undefined) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.headerContainer}>
                    <p className={styles.header}>Контейнер Small TEU</p>
                    <button className={styles.crossBtn} onClick={onClose}><img src={cross}
                                                                               style={{width: "12px"}}
                                                                               alt=""/></button>
                </div>
                <p className={styles.text}>Высота: 2591 см</p>
                <p className={styles.text}>Длина: 6059 см</p>
                <p className={styles.text}>Ширина : 2438 см</p>
                <p className={styles.text}>Высота проема: 2260 см</p>
                <p className={styles.text}>Ширина проема: 2339 см</p>
            </div>
        )
    } else {

        switch (type) {
            case "small":
                return (
                    <div className={styles.wrapper}>
                        <div className={styles.headerContainer}>
                            <p className={styles.header}>Контейнер Small TEU</p>
                            <button className={styles.crossBtn} onClick={onClose}><img src={cross}
                                                                                       style={{width: "12px"}}
                                                                                       alt=""/></button>
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
                    <div className={styles.wrapper}>
                        <div className={styles.headerContainer}>
                            <p className={styles.header}>Контейнер Large FEU</p>
                            <button className={styles.crossBtn} onClick={onClose}><img src={cross} alt=""/></button>
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
                    <div className={styles.wrapper}>
                        <div className={styles.headerContainer}>
                            <p className={styles.header}>Контейнер Refrigerator Carrier</p>
                            <button className={styles.crossBtn} onClick={onClose}><img src={cross} alt=""/></button>
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
                    <div className={styles.wrapper}>
                        <div className={styles.headerContainer}>
                            <p className={styles.header}>Оффшорный счет</p>
                            <button className={styles.crossBtn} onClick={onClose}><img src={cross} alt=""/></button>
                        </div>
                        <p className={styles.text}>Ваш личный счёт для возможности выполнения операций по счёту.
                            Так как деньги поступают от компаний расположенных в разных странах мира,
                            Вам был создан счёт в партнерском банке для приёма платежей.
                            Для вывода средств переведите на Ваш личный баланс и выберете удобный способ выплаты.</p>
                    </div>
                )
        }
    }
}