import React, {FC} from "react";
import styles from "./styles.module.scss";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

export const Support: FC = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return (
      <div>
         <TopNavbar isDesktop={isDesktop} label={"Служба поддержки"} isMenu={false}/>
         <div className={styles.info}>
            <p>По всем вопросам обращаться в службу поддержки</p>
            <p>Почта: <a href="https://flowtokcom@gmail.com" target="_blank"
                         rel="noopener noreferrer">flowtokcom@gmail.com</a></p>
            <p>Телеграм: <a href="https://t.me/flowtokcom" target="_blank" rel="noopener noreferrer">flowtokcom</a></p>
         </div>
      </div>

   )
}