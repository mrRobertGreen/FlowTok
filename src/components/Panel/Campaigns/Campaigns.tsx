import React from "react";
import styles from "./styles.module.scss";
import plus from "../../../media/icons/CompanyPlusButton.svg";
import {CampaignsCard} from "./CampaignsCard/CampaignsCard";


export const Campaigns = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <p className={styles.title__text}>Компании</p>
                <button className={styles.plusButton}>
                    <img src={plus} className={styles.plusImg} alt=""/>
                </button>
            </div>
            <div className={styles.campaignsList}>
                {/*здесь нужен флаг, от которого будет меняться css*/}
                {/*Если компания одна, то паддинг карточки справа - 45px*/}
                {/*Если несколько, то gap 15px (или паддинг, тут не важно)*/}
                <CampaignsCard />
                <CampaignsCard />

            </div>
        </div>
    )
}