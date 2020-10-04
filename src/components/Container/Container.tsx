import React, {FC} from "react";
import styles from "./styles.module.scss";
import container from "../../media/images_new/container.svg";
import VerticalLine from "../../media/images_new/VerticalLine.svg";

import info from "../../media/images_new/Info.svg";

/*
Когда будешь вносить пропсы, то эта компонента используется как в Profile/Profile, так и TaskList
*/


type PropsT = {
    isInformed?: boolean
}
type InfoProps = {

}

export const Container: FC<PropsT> = ({isInformed = false})=> {

    const InformedButton: FC<InfoProps> = () => {
        if (isInformed) {
            return (
                <img src={info} style={{paddingLeft:"9px", height:"19px"}} alt=""/>
            )
        }
        else {
            return(
                <span />
            )
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                {"Контейнер Small"}
                <InformedButton />
            </div>
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