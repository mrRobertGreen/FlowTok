import React, {FC} from "react";
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";

export const Description: FC = ({}) => {
    const {t} = useTranslation();

    return (
        <div className={styles.wrapper}>
            <div className={styles.paysystem}>
                <a href="//freekassa.ru/"><img src="//www.free-kassa.ru/img/fk_btn/17.png"
                                               title="Приём оплаты на сайте картами"/></a>
                <a href="https://www.fkwallet.ru"><img
                    src="https://www.fkwallet.ru/assets/2017/images/btns/iconsmall_wallet9.png"
                    title="Обмен криптовалют"/></a>
            </div>
            <div style={{marginBottom: "10px"}}>
                <p className={styles.firm}>LLC TAKE CONTAINER</p>
                <p className={styles.firm}>Bonistraat 9</p>
                <div className={styles.info}>
                    <p className={styles.firm}>1094 SH Amsterdam Holland</p>
                    <p className={styles.support}><a
                        href="mailto:support@take-container.com">support@take-container.com</a></p>
                </div>
            </div>
        </div>
    )
}