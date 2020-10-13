import React, {FC, useState} from "react";
import styles from "./styles.module.scss";
import {Card} from "../Card/Card";
import cross from "../../media/images_new/Cross.svg"
import container from "../../media/images_new/container.svg";
import VerticalLine from "../../media/images_new/VerticalLine.svg";
import Button from "../Button/Button";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {closeGift, getGift} from "../../redux/user/user-reducer";
import {useTranslation} from "react-i18next";

type PropsType = {
   title: string,
   text: string
}

export const Gift: FC<PropsType> = ({title, text}) => {

   const dispatch = useDispatch()

   const onGetGift = () => {
      dispatch(getGift())
   }
   const onCloseGift = () => {
      dispatch(closeGift())
   }

   const {t} = useTranslation()

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div>
                    <div className={styles.header}>
                        <div className={styles.header__container}>
                            <p className={styles.header__title}>{title}</p>
                            <button style={{backgroundColor: "white"}} onClick={onCloseGift} className={styles.cross}>
                                <img src={cross} alt=""/>
                            </button>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <img src={container} className={styles.image} alt=" "/>
                        <img src={VerticalLine} alt=""/>
                        <div className={styles.text}>
                            {text}
                        </div>
                    </div>
                    <NavLink to={"/"}>
                        <Button mod={"green"} onClick={onGetGift}>
                            {t("gift-get")}
                        </Button>
                    </NavLink>
                </div>

            </div>
         </div>

   )
}