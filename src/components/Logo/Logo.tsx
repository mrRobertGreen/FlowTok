import React from "react";
import logoIcon from "../../media/icons/logo_icon.svg"
import  styles from "./styles.module.scss"

/*
* Компонент логотипа. Сам знаешь, как сделать. Шрифт и картинка уже подключены.
* */

export const Logo = () => {
   return (
      <div>
         <img src={logoIcon} alt=""/>
         <div className={styles.name}>
            FlowTok
         </div>
      </div>

   )
}