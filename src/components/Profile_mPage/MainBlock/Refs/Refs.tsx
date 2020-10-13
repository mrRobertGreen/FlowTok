import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {RootStateType} from "../../../../redux/store";
import {useCache} from "../../../../hooks/useCache";
import {getContainers} from "../../../../redux/user/user-reducer";
import Button from "../../../Button/Button";
import {Input} from "../../../Input/Input";
import {RefDataType, ReferralT} from "../../../../api/user-api";
import {Separator} from "../../../Separator/Separator";
import {useMedia} from "react-media";
import {GLOBAL_MEDIA_QUERIES} from "../../../Page/Page";
import separatorY from "../../../../media/icons/separator_y.svg"
import {useTranslation} from "react-i18next";
import info from "../../../../media/images_new/Info.svg";
import Modal from "../../../common/Modal/Modal";
import {ToolTip} from "../../../ToolTip/ToolTip";
import men from "../../../../media/images_new/user copy@2x.svg";
import separator from "../../../../media/images_new/VerticalLine.svg"

type PropsType = {
    refData: ReferralT
}

export const Refs: FC<PropsType> = ({refData}) => {
    const [isCopied, setIsCopied] = useState(false)

    const queries = useMedia({queries: GLOBAL_MEDIA_QUERIES})
    const {t} = useTranslation()
    const [isTooltip, setIsTooltip] = useState(false)


    const onOpenTooltip = () => {
        setIsTooltip(true)
    }
    const onCloseTooltip = () => {
        setIsTooltip(false)
    }

    const onCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
        console.log("click")
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1500)
    }

    const {link, money, referrals} = refData

    return (
        <div className={styles.wrapper}>
            <Modal isOpen={isTooltip}>
                <ToolTip onClose={onCloseTooltip} isRef={true}/>
            </Modal>
            <div className={styles.main}>
                <div>
                    <div className={styles.title}>
                        {t("refs-title")}
                        <InformedButton isInformed={true} onClick={onOpenTooltip}/>
                    </div>
                    <div className={styles.referralDescription}>{t("referral-description-text")}</div>
                    <div className={styles.row}>
                        <div className={styles.input}>
                            <Input type="text" readOnly={true} value={link} mod={"grey"}/>
                        </div>
                        <div className={styles.btn}>
                            <Button
                                mod={"gradient"}
                                onClick={() => onCopy(link)}
                                disabled={isCopied}
                                style={{background: isCopied ? "#00BA32" : ""}}
                            >
                                {!isCopied && t("refs-btn")}
                                {isCopied && t("refs-btnIsCopied")}
                            </Button>
                        </div>
                    </div>
                </div>
                {!queries.largeTablet && <Separator m={"15px 7px"}/>}
                <div className={styles.statsBlock}>
                    <div className={styles.item}>
                        <div className={styles.label}>
                            {t("refs-count")}
                        </div>
                        <div className={styles.numbers}>
                            <p>
                                {/* тут я прохожусь по ключам объекта и складываю все значения a, b, c, и тд, чтобы получить общее кол-во рефералов*/}
                                {(Object.keys(referrals) as Array<keyof typeof referrals>).reduce((previousValue, key) => (
                                    previousValue + referrals[key]
                                ), 0)}
                                <img src={men} className={styles.men} alt=""/>
                            </p>
                        </div>
                    </div>
                    <img src={separator} alt="" className={styles.big_separator}/>
                    <div className={styles.money_item}>
                        <div>
                            <div className={styles.label}>
                                {t("refs-earned")}
                            </div>
                            <div className={styles.numbers}>
                                {money}₽
                            </div>
                        </div>
                    </div>
                </div>
                {!queries.largeTablet && <Separator m={"15px 7px"}/>}
                <div className={styles.refPeople}>
                    <div className={styles.refPeople__container}>
                        <div className={styles.box}>
                            <p className={styles.refPeople__level}>1</p>
                            <div className={styles.numbers_container}>
                                <p className={styles.refPeople__numbers}>{referrals.a ? referrals.a : 0}</p>
                                <img src={men} className={styles.men} alt=""/>
                            </div>
                        </div>
                        <img src={separator} alt="" className={styles.separator}/>
                        <div className={styles.box}>
                            <p className={styles.refPeople__level}>2</p>
                            <div className={styles.numbers_container}>
                                <p className={styles.refPeople__numbers}>{referrals.b ? referrals.b : 0}</p>
                                <img src={men} className={styles.men} alt=""/>
                            </div>
                        </div>
                        <img src={separator} alt="" className={styles.separator}/>
                        <div className={styles.box}>
                            <p className={styles.refPeople__level}>3</p>
                            <div className={styles.numbers_container}>
                                <p className={styles.refPeople__numbers}>{referrals.c ? referrals.c : 0}</p>
                                <img src={men} className={styles.men} alt=""/>
                            </div>
                        </div>
                        <img src={separator} alt="" className={styles.separator}/>
                        <div className={styles.box}>
                            <p className={styles.refPeople__level}>4</p>
                            <div className={styles.numbers_container}>
                                <p className={styles.refPeople__numbers}>{referrals.d ? referrals.d : 0}</p>
                                <img src={men} className={styles.men} alt=""/>
                            </div>
                        </div>
                        <img src={separator} alt="" className={styles.separator}/>
                        <div className={styles.box}>
                            <p className={styles.refPeople__level}>5</p>
                            <div className={styles.numbers_container}>
                                <p className={styles.refPeople__numbers}>{referrals.e ? referrals.e : 0}</p>
                                <img src={men} className={styles.men} alt=""/>
                            </div>
                        </div>
                    </div>
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