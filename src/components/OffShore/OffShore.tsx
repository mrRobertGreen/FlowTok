import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import info from "../../media/images_new/Info.svg";
import {Card} from "../Card/Card";
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {
    format,
    getAllTimeMoney,
    getEverySecMoney,
    getRealTimeProfit,
    getSecondsToday,
    round
} from "../../utils/realTimeData";
import {transfer} from "../../redux/user/user-reducer";
import {useTranslation} from "react-i18next";
import Modal from "../common/Modal/Modal";
import {ToolTip} from "../ToolTip/ToolTip";

type PropsType = {
    maxBank: number
}

export const OffShore: FC<PropsType> = ({maxBank}) => {

    const bank = useSelector((state: RootStateType) => state.user.bank)
    const cy = useSelector((state: RootStateType) => state.app.cy)
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const onTransfer = () => {
        dispatch(transfer(setIsLoading))
    }
    const {t} = useTranslation()

    if (!bank) return <></>

    return (
        <div className={styles.wrapper}>
            <Modal isOpen={isOpen}>
                <ToolTip onClose={() => setIsOpen(false)} />
            </Modal>
            <div className={styles.main}>
                <div className={styles.title}>
                    <p>{t("offShore-title")}</p>
                    <button style={{backgroundColor:"white"}} onClick={() => setIsOpen(true)}>
                        <img src={info} className={styles.title__info} alt=""/>
                    </button>
                </div>
                <div className={styles.label}>
                    {t("balance")}
                </div>
                <div className={styles.sum}>
                    <p className={styles.money}>{format(round(bank, 10))}{cy === "RUB" ? "₽" : "$"}</p>
                </div>
                <div className={styles.subLabel}>
                    {t("from") + " " + format(round(maxBank, 10))}{cy === "RUB" ? "₽" : "$"}
                </div>
                <Button mod={isLoading ? "loading" : "gradient"} onClick={onTransfer}>
                    {t("offShore-inWallet")}
                </Button>
            </div>
        </div>
    )
}

