import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import BackArrowIcon from "../../media/icons/back_arrow_icon.svg";
import {NavLink} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {RootStateType} from "../../redux/store";
import Preloader from "../../components/common/Preloader/Preloader";
import { compose } from "redux";
import {withAuthRedirect, withCabinetRedirect} from "../../hocs/hocs";

type PropsType = {}

const Refs_m: FC<PropsType & PropsFromRedux> = ({refData}) => {

   const [isCopied, setIsCopied] = useState( false)

   if (!refData) return <Preloader/>

   const onCopy = async (text: string) => {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
   }

   return (
      <div className={styles.wrapper}>
         <NavLink to={"/profile"}>
            <div className={styles.backBtn}>
               <img src={BackArrowIcon} alt="back"/>
            </div>
         </NavLink>
         <div className={styles.refBlock}>
            <div className={styles.title}>
               Ваша реферальная ссылка
            </div>
            <div className={styles.input}>
               <Input type="text" readOnly={true} value={refData.link}/>
            </div>
            <div className={styles.btn}>
               <Button
                  onButtonClick={() => onCopy(refData.link)}
                  mod={isCopied ? "grey" : undefined}
                  disabled={isCopied}
               >
                  {!isCopied && "Копировать"}
                  {isCopied && "Скопировано"}
               </Button>
            </div>
         </div>
         <div className={styles.statsBlock}>
            <div className={styles.item}>
               <div className={styles.numbers}>
                  {refData.value}₽
               </div>
               <div className={styles.label}>
                  Заработано всего
               </div>
            </div>
            <div className={styles.item}>
               <div className={styles.numbers}>
                  {refData.refs}
               </div>
               <div className={styles.label}>
                  Кол-во рефералов
               </div>
            </div>
         </div>
      </div>
   )
}

const mapStateToProps = (state: RootStateType) => ({
   refData: state.user.refData
})

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose(
   connector,
   withCabinetRedirect,
   withAuthRedirect
)(Refs_m)