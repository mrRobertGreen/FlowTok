import React, {FC} from "react";
import styles from "./styles.module.scss";
import {NavLink} from "react-router-dom";
import Button from "../../../components/Button/Button";
import {MainPicture} from "../../../components/MainPicture/MainPicture"

export const Main: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.mainText}>
                    <div className={styles.mainText__earn}>
                        <p>Зарабатывай с Take Container</p>
                    </div>
                    <div className={styles.mainText__content}>
                        <p>Инвестируй в контейнеры и получай доход</p>
                    </div>
                    <div className={styles.buttons}>
                        <NavLink to={"/reg"}>
                            <div className={styles.mainText__createBtn}>
                                <Button mod={"gradient"} children={"Создать аккаунт"} br={"42px"}/>
                            </div>
                        </NavLink>
                        <NavLink to={"/login"}>
                            <div>
                                <button className={styles.In}>Войти</button>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={styles.mainPic}>
                <MainPicture isDesktop={true}/>
            </div>
        </div>
    )
}