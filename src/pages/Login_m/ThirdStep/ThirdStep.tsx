import React, {FC, useState} from 'react';
import styles from "./styles.module.scss"
import Button from "../../../components/Button/Button";
import {Input} from "../../../components/Input/Input";
import {setTikTok} from "../../../redux/auth-reducer";
import {RootStateType} from "../../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {compose} from "redux";
import {withCabinetRedirect, withProfileRedirect} from "../../../hocs/hocs";
import {Redirect} from "react-router";
import Preloader from "../../../components/common/Preloader/Preloader";

type PropsType = {
   isDesktop: boolean
}

const ThirdStep: FC<PropsType & PropsFromRedux> = ({setTikTok, userRole, isFetching, isDesktop}) => {
   const [inputValue, setInputValue] = useState("")

   if (!localStorage.getItem("token")) { // if there isn't token go to the 1st step
      return <Redirect to={"/login/1"}/>
   }

   if (userRole === "Nobody") { // if user role is nobody go to the 2nd step
      return <Redirect to={"/login/2"}/>
   }

   if (isFetching) {
      return <Preloader/>
   }

   const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
   }

   const onButtonClick = () => {
      setTikTok(inputValue)
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <div className={styles.blockTop}>
               <div className={styles.blockTop__header}>
                  Верефикация вашего аккаунта
               </div>
               <div className={styles.blockTop__input}>
                  <Input
                     type={"text"}
                     value={inputValue}
                     placeholder={"Вставьте ссылку на ваш аккаунт"}
                     onChange={onChangeValue}
                  />
               </div>
               <a href={isDesktop ? "https://www.tiktok.com/ru/" : "tiktok://"} target="_blank" rel="noopener noreferrer">
                  <div className={styles.btn}>
                     <Button mod="tiktok"/>
                  </div>
               </a>
            </div>
            <div className={styles.btn}>
               <Button
                  mod={!!inputValue.trim() ? undefined : "grey"}
                  disabled={!inputValue.trim()}
                  onButtonClick={onButtonClick}
               >
                  Продолжить</Button>
            </div>
         </div>
      </div>
   )
}

const mapDispatchToProps = {
   setTikTok,
}
const mapStateToProps = (state: RootStateType) => ({
   userRole: state.auth.role,
   isFetching: state.app.isFetching,
});

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<React.ComponentType>(
   withProfileRedirect,
   withCabinetRedirect,
   connector,
)(ThirdStep)