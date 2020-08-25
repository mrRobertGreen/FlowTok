import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";
import BackArrowIcon from "../../media/icons/back_arrow_icon.svg";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import Preloader from "../../components/common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect, withCabinetRedirect} from "../../hocs/hocs";
import {getRefData} from "../../redux/user-reducer";

type PropsType = {}

const Refs_m: FC<PropsType & RouteComponentProps> = ({history}) => {
   const goBack = () => {
      history.goBack()
   }
   const dispatch = useDispatch()
   const refData = useSelector((state: RootStateType) => state.user.refData)

   useEffect(() => {
      if (!refData) dispatch(getRefData())
   }, [refData, dispatch])

   const [isCopied, setIsCopied] = useState(false)

   if (!refData) return <Preloader/>

   const onCopy = async (text: string) => {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.backBtn} onClick={goBack}>
            <img src={BackArrowIcon} alt="back"/>
         </div>
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
         {/*{refData.refs < 5 &&*/}
			{/*<div className={styles.taskBlock}>*/}
			{/*	<p className={styles.title}>Зарабатывай на рефералах!</p>*/}
			{/*	<p className={styles.label}>*/}
			{/*		Пригласите первых 5 рефералов и получите <b>15</b> рублей!*/}
			{/*	</p>*/}
			{/*	<p className={styles.label}>*/}
			{/*		Вам осталось всего <span>{5 - refData.refs}</span> рефералов*/}
			{/*	</p>*/}
			{/*</div>*/}
         {/*}*/}
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

export default compose(
   withCabinetRedirect,
   withAuthRedirect,
   withRouter
)(Refs_m)