import React, {FC} from "react";
import styles from "./styles.module.scss";
import {DoubleText} from "../../DoubleText/DoubleText";
import {Separator} from "../../Separator/Separator";
import {NavLink} from "react-router-dom";
import {UserDataForm} from "../../forms/UserDataForm/UserDataForm";
import {MiniUserDataForm} from "../../forms/MiniUserDataForm/MiniUserDataForm";

type PropsT = {}

export const Account: FC<PropsT> = ({}) => {
    return (
        <div className={styles.wrapper}>

            <div className={styles.tikTokAcc}>
                <NavLink to={"/profile"}>
                    <div className={styles.tikTokAcc__Container}>
                        <img src="" className={styles.avatar} alt=" "/>
                        <div className={styles.name}>
                            <p className={styles.name__acc}>karinakross</p>
                            <p className={styles.name__mail}>@karinakross</p>
                        </div>
                    </div>
                </NavLink>

                <p className={styles.changeAcc}>Изменить аккаунт</p>
            </div>
            <Separator m={"21px 0 0 0"}/>
            <DoubleText
                FirstChildren={"О вас"}
                SecondChildren={"Укажите актуальные данные и мы лучше подберем задания для Вас!"}
                pt={"15.5px"}
                pb={"0"}/>

            <Separator m={"20px 0"}/>
            <MiniUserDataForm/>
           <Separator m={"10px 0"}/>
            <div className={styles.cancel}>
                <p className={styles.cancel__text}>Выйти из профиля</p>
                <button className={styles.cancel__btn}>Выйти</button>
            </div>
        </div>
    )
}