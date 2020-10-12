import React, {FC} from "react";
import logoIcon from "../../media/icons/logo_icon.svg"
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

/*
* Компонент логотипа. Сам знаешь, как сделать. Шрифт и картинка уже подключены.
* */

export const Logo: FC = () => {
   const isDesktop = useSelector(((state: RootStateType) => state.app.isDesktop))

   return (
      <div className={styles.wrapper}>
         {/*<img src={logoIcon} alt="" className={styles.image}/>*/}
			<div className={styles.name}>
				Take Containers
			</div>
      </div>

   )
}