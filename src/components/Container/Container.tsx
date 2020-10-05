import React, {FC} from "react";
import styles from "./styles.module.scss";
import container from "../../media/images_new/container.svg";
import VerticalLine from "../../media/images_new/VerticalLine.svg";

import info from "../../media/images_new/Info.svg";
import {ContainerObjT} from "../../api/user-api";

type InfoProps = {
    isInformed: boolean
}

type PropsT = {
    isInformed?: boolean
    data?: ContainerObjT
}

const InformedButton: FC<InfoProps> = ({isInformed}) => {
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

export const Container: FC<PropsT> = ({isInformed = false, data})=> {

    if (!data) data = {
        image: "",
        need: "До 2 шт. осталось 70%",
        quantity: "1 шт. + 30%",
        type: "Large"
    }

    const {image, need, quantity, type} = data

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                Контейнер {type}
                <InformedButton isInformed={isInformed}/>
            </div>
            <div className={styles.container}>
                <img src={container} className={styles.image} alt=" "/>
                <img src={VerticalLine} alt=""/>
                <div className={styles.text}>
                    <div className={styles.text__little}>Количество</div>
                    <div className={styles.text__large}>{quantity}</div>
                    <div className={styles.text__little}>{need}</div>
                </div>
            </div>
        </div>
    )
}