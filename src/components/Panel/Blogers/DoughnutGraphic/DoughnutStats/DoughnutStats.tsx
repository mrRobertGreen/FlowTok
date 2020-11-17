import React, {FC} from "react"
import styles from "./styles.module.scss";
import greenMan from "../../../../../media/icons/greenMan.svg";
import yellowMan from "../../../../../media/icons/yellowMan.svg";
import redMan from "../../../../../media/icons/redMan.svg";

// статистика рядом с графиком-пончиком

type PropsT = {
    mod?: "vertical" | "horizontal"
}

export const DoughnutStats: FC<PropsT> = ({mod}) => {
    let StylesWrapper = {};
    let StylesContainer = {};
    if (mod == "horizontal") {
        StylesWrapper = {display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gridTemplateRows:"1fr"};
        StylesContainer = {paddingTop:"0"}
    }

    return (
        <div className={styles.wrapper} style={StylesWrapper}>
            <div className={styles.container_main}>
                <img src={greenMan} className={styles.img} alt=""/>
                <div className={styles.status}>
                    <p className={styles.status__text}>Выполнили</p>
                    <p className={styles.numbers}>927</p>
                </div>
            </div>

            <div className={styles.container} style={StylesContainer}>
                <img src={yellowMan} className={styles.img} alt=""/>
                <div className={styles.status}>
                    <p className={styles.status__text}>В процессе</p>
                    <p className={styles.numbers}>163</p>
                </div>
            </div>

            <div className={styles.container} style={StylesContainer}>
                <img src={redMan} className={styles.img} alt=""/>
                <div className={styles.status}>
                    <p className={styles.status__text}>Отменили</p>
                    <p className={styles.numbers}>18</p>
                </div>
            </div>
        </div>
    )
}