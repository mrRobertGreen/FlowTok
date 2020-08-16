import React, {FC} from "react";
import styles from "./styles.module.scss"
import menuBtn from "../../../../media/icons/menu_btn.svg"

type PropsType = {
   setMenuVisible: (flag: boolean) => void
   isMenuVisible: boolean
   name: string
   login: string
   image: string
   fans: string
   heart: string
}

const Info: FC<PropsType> = ({
                                setMenuVisible,
                                isMenuVisible,
                                name,
                                login,
                                image,
                                heart,
                                fans,
                             }) => {

   const onMenuClick = () => {
      setMenuVisible(!isMenuVisible)
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.topBlock}>
            <div
               onClick={onMenuClick}
               className={styles.menuBtn}
               style={{background: `url(${menuBtn}) 0 0/100% 100% no-repeat`}}
            />
            <div className={styles.avatar}>
               <img src={image} alt="avatar"/>
            </div>
            <div className={styles.fullName}>
               {name}
            </div>
            <div className={styles.login}>
               {login}
            </div>
         </div>
         <div className={styles.bottomBlock}>
            <div className={styles.bottomBlock__item}>
               <div className={styles.value}>{fans}</div>
               <div className={styles.label}>Подписчиков</div>
            </div>
            <div className={styles.bottomBlock__item}>
               <div className={styles.value}>{heart}</div>
               <div className={styles.label}>Лайков</div>
            </div>
         </div>
      </div>
   )
}

export default Info