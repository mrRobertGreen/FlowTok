import React, {FC} from "react";
import styles from "./styles.module.scss";
import container from "../../media/images_new/container.svg";
import VerticalLine from "../../media/images_new/VerticalLine.svg"

type PropsT = {

}

export const Container: FC<PropsT> = ()=> {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{"Контейнер Small"}</div>
            <div className={styles.container}>
                <img src={container} className={styles.image} alt=" "/>
                <img src={VerticalLine} alt=""/>
                <div className={styles.text}>
                    <div className={styles.text__little}>Количество</div>
                    <div className={styles.text__large}>{"1шт. + 30%"}</div>
                    <div className={styles.text__little}>{"До 2 штук осталось 70% "}</div>
                </div>
            </div>
        </div>
    )
}