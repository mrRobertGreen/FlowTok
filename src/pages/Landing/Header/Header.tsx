import React, {FC} from "react";
import styles from "./styles.module.scss"
import {Logo} from "../../../components/Logo/Logo";

/*
* Это шапка сайта. Делай так: объедини все кнопки в один блок и разнеси его и логотип по разным
* сторонам с помощью justify-content: space-between.
*
* Компонент логотипа надо доделать.
*
* Кнопку "Создать аккаунт" сделай в виде ссылки (<NavLink to="/"></NavLink>)
*
* Телеграм и почта - тоже ссылки, но уже просто <a><a/>
* */

export const Header: FC = () => {
   return (
      <div className={styles.wrapper}>
         <Logo/>
         <div>
            Тут три кнопки
         </div>
      </div>
   )
}