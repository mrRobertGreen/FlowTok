import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Button from "../../../Button/Button";
import {NavLink} from "react-router-dom";

import clock from "../../../../media/images_new/clock.svg";
import Modal from "../../../common/Modal/Modal";
import {History} from "../History/History";
import {HistoryItemT} from "../../../../api/user-api";


export type PropsType = {
    value: number
    history: Array<HistoryItemT>
}

const Balance: FC<PropsType> = ({value, history}) => {
    const [isHistory, setIsHistory] = useState(false)

    return (
        <div data-test={"wrapper"} className={styles.wrapper}>
            <Modal isOpen={isHistory}>
                <History onClose={setIsHistory} history={history}/>
            </Modal>
            <div>
                <div className={styles.title}>
                    Кошелек
                    <button className={styles.clock} onClick={() => setIsHistory(!isHistory)}>
                        <img src={clock} alt=""/>
                    </button>
                </div>
                <div className={styles.label}>
                    Ваш баланс
                </div>
                <div className={styles.money}>
                    {value}₽
                </div>
            </div>

            <div className={styles.btn} data-test={"btn"}>
                <div className={styles.btn__first}>
                    <NavLink to={"/withdraw"}>
                        <Button data-test={"btn"} mod={"green"}>Пополнить</Button>
                    </NavLink>
                </div>
                <div className={styles.btn__second}>
                    <NavLink to={"/withdraw"}>
                        <Button data-test={"button"} mod={"gradient"}>Выплатить</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Balance