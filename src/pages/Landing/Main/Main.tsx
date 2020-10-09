import React, {FC} from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { MainPicture } from "../../../components/MainPicture/MainPicture"


/*
* Это основной блок лендинга.
* Делай так: разбей на две части (заметь, не половины) и установи для каждой минимальную ширину либо падинги
*
* Основная сложность тут в размещении геом. фигур и вставки видео. Не знаю, как встраивать видео.
* Погугли, как это делается.
*
* Кнопку "Создать аккаунт" сделай в виде ссылки (<NavLink to="/"></NavLink>).
*
* Можешь сильно не дробить на компоненты, так как они используются только здесь.
* Кроме кнопки, она общая.
* */

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
            <div className={styles.mainPic}>
                <MainPicture isDesktop={true}/>
            </div>
        </div>
    )
}