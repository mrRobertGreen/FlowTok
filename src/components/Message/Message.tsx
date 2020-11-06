import React from "react"
import styles from "./styles.module.scss";
import messagePic from "../../media/icons/MessageButton.svg"
import {DoubleText} from "../DoubleText/DoubleText";
import {Separator} from "../Separator/Separator";
import Modal from "../common/Modal/Modal";

export const Message = () => {

    return (
        <div className={styles.wrapper}>
            {/*<div className={styles.modal}>*/}
            {/*    <Modal isOpen={isOpen} >*/}
            {/*        <Support/>*/}
            {/*    </Modal>*/}
            {/*</div>*/}
            <button className={styles.btn}>
                <img src={messagePic} className={styles.btn__img} alt=""/>
            </button>
        </div>
    )
}

const Support = () => {
    return (
        <div className={styles.main}>
            <div className={styles.Card}>
                <div className={styles.title}>
                    Поддержка
                </div>
                <div className={styles.connectText}>
                    <DoubleText
                        FirstChildren={""}
                        SecondChildren={"По любым вопросам Вы можется свзяаться с нами по почте или через наш Telegram"}
                        pt={"0"}
                        pb={"0"}/>
                </div>
                <div className={styles.connect} style={{paddingBottom: "15px"}}>
                    <p className={styles.connect__mailType}>Почта</p>
                    <p className={styles.connect__mail}>flowtokcom@gmail.com</p>
                </div>

                <Separator m={"0 0"}/>

                <div className={styles.connect}>
                    <p className={styles.connect__mailType}>Telegram</p>
                    <p className={styles.connect__mail}>@flowtokcom</p>
                </div>

            </div>
        </div>
    )
}