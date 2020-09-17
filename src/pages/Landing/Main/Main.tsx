import React, {FC} from "react";
import styles from "./styles.module.scss";
import {NavLink} from "react-router-dom";
import Button from "../../../components/Button/Button";

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
            <div className={styles.mainText}>
                <div className={styles.mainText__earn}>
                    <p>Зарабатывай с FlowTok</p>
                </div>
                <div>
                    <p>Создавай потрясающий контент и получай за него деньги</p>
                </div>
                <NavLink to={"/"}>
                    <Button mod={"gradient"} children={"Создать"}></Button>
                </NavLink>
            </div>
            <div>
                Тут правая
            </div>
        </div>
    )
}