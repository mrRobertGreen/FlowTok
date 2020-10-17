    import React, {FC} from "react";
import styles from "./styles.module.scss"
import Button from "../../../components/Button/Button";
import {NavLink} from "react-router-dom";
import menuBtn from "../../../media/icons/menu_btn.svg";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";

type PropsType = {
   value: number
   setMenuVisible: (flag: boolean) => void
   isMenuVisible: boolean
}

const Balance: FC<PropsType> = ({value, setMenuVisible, isMenuVisible}) => {

   const cy = useSelector((state: RootStateType) => state.app.cy)

   const onMenuClick = () => {
      setMenuVisible(!isMenuVisible)
   }

   return (
      <div className={styles.wrapper}>
         <div
            onClick={onMenuClick}
            className={styles.menuBtn}
            style={{background: `url(${menuBtn}) 0 0/100% 100% no-repeat`}}
         />
         <div className={styles.title}>
            Текущий баланс
         </div>
         <div className={styles.payInBlock}>
            <div className={styles.balance}>
               {value}{cy === "RUB" ? "₽" : "$"}
            </div>
            <div className={styles.btn}>
               <NavLink to={"/topup"}>
                  {/*<Button onButtonClick={() => {*/}
                  {/*}} mod={"bright"}>*/}
                  {/*   Пополнить*/}
                  {/*</Button>*/}
               </NavLink>
            </div>
         </div>
         <NavLink to={"/task_form"}>
            {/*<Button onButtonClick={() => {}}>Создать кампанию</Button>*/}
         </NavLink>
         
      </div>
   )
}

export default Balance