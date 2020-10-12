import React, {FC, useState} from "react";
import styles from "./styles.module.scss";
import container from "../../media/images_new/container.svg";
import VerticalLine from "../../media/images_new/VerticalLine.svg";
import info from "../../media/images_new/Info.svg";

import Modal from "../common/Modal/Modal";
import {ToolTip} from "../ToolTip/ToolTip";

import {BuyContainerT, ContainerObjT} from "../../api/user-api";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";


type PropsT = {
    isInformed?: boolean
    data: ContainerObjT
    buyData?: BuyContainerT
}
export const Container: FC<PropsT> = ({isInformed = false, data, buyData}) => {


    const {image, need, quantity, type} = data
    const [isTooltip, setIsTooltip] = useState(false)
    const cy = useSelector((state: RootStateType) => state.app.cy)

    const {t} = useTranslation()
    const onOpenTooltip = () => {
        setIsTooltip(true)
    }
    const onCloseTooltip = () => {
        setIsTooltip(false)
    }


    return (
        <div className={styles.wrapper}>
            <Modal isOpen={isTooltip}>
                <ToolTip onClose={onCloseTooltip}/>
            </Modal>
            <div className={styles.title}>
                {t("container-title")} {type}
                <InformedButton isInformed={isInformed} onClick={onOpenTooltip}/>
                {buyData ? <p className={styles.text__little_2}>{t("price-text")}: {buyData.cost} {cy === "RUB" ? "₽" : "$"} {t("per-piece-text")}</p> : <div/>}
            </div>
            <div className={styles.container}>
                <div className={styles.container__image}>
                    <img src={image} className={styles.image} alt=" "/>
                    <img src={VerticalLine} alt=""/>
                </div>
                <div className={styles.text}>
                    <div className={styles.text__little}>{t("container-quantity")}</div>
                    <div className={styles.text__large}>{quantity}</div>
                    <div className={styles.text__little}>{need}</div>
                </div>
            </div>
        </div>
    )
}

type InfoProps = {

    isInformed: boolean
    onClick: () => void,
}

const InformedButton: FC<InfoProps> = ({isInformed, onClick}) => {

    if (isInformed) {
        return (
            <img src={info} style={{paddingLeft: "9px", height: "19px"}} alt="" onClick={onClick}/>
        )
    } else {
        return (
            <span/>
        )
    }

}

// const Cost: FC<InfoProps> = ({isInformed}) => {
//     if (isInformed) {
//         return (
//             <div>ih</div>
//         )
//     }
// }