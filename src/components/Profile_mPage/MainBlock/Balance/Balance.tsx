import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Button from "../../../Button/Button";
import {NavLink} from "react-router-dom";

import clock from "../../../../media/images_new/clock.svg";
import Modal from "../../../common/Modal/Modal";
import {History} from "../History/History";
import {HistoryItemT} from "../../../../api/user-api";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";


export type PropsType = {
   value: number
   history?: Array<HistoryItemT>
}

const Balance: FC<PropsType> = ({value, history}) => {
   // const [isHistory, setIsHistory] = useState(false)

   const cy = useSelector((state: RootStateType) => state.app.cy)

   const {t} = useTranslation()

    return (
        <div data-test={"wrapper"} className={styles.wrapper}>
            <div className={styles.main}>
                {/*<Modal isOpen={isHistory}>*/}
                {/*    <History history={history}/>*/}
                {/*</Modal>*/}
                <div>
                    <div className={styles.title}>
                        {t("balance-title")}
                        {/*{history && history.length > 0 && <button className={styles.clock} onClick={() => setIsHistory(!isHistory)}>*/}
                        {/*    <img src={clock} alt=""/>*/}
                        {/*</button>}*/}
                    </div>
                    <div className={styles.label}>
                        {t("balance")}
                    </div>
                    <div className={styles.money}>
                        {value}{cy === "RUB" ? "₽" : "$"}
                    </div>
                </div>

                <div className={styles.btn} data-test={"btn"}>
                    <div className={styles.btn__first}>
                        <NavLink to={"/withdraw"}>
                            <Button data-test={"btn"} mod={"green"}>{t("balance-payin")}</Button>
                        </NavLink>
                    </div>
                    <div className={styles.btn__second}>
                        <NavLink to={"/withdraw"}>
                            <Button data-test={"button"} mod={"gradient"}>{t("balance-payoff")}</Button>
                        </NavLink>
                    </div>
                </div>

                <History history={history}/>
            </div>
        </div>
    )
}

export default Balance