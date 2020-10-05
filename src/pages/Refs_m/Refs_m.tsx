import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";
import BackArrowIcon from "../../media/icons/back_arrow.svg";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import Preloader from "../../components/common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect, withCabinetRedirect} from "../../hocs/hocs";
import {getContainers} from "../../redux/user/user-reducer";
import {useCache} from "../../hooks/useCache";

type PropsType = {}

const Refs_m: FC<PropsType & RouteComponentProps> = ({history}) => {
   const goBack = () => {
      history.goBack()
   }
   const dispatch = useDispatch()
   const refData = useSelector((state: RootStateType) => state.user.refData)

   useEffect(() => {
      if (!refData) dispatch(getContainers())
   }, [refData, dispatch])

   const [isCopied, setIsCopied] = useState(false)

   if (!refData) return <Preloader/>

   const onCopy = async (text: string) => {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
   }

   return (
      <div className={styles.wrapper}>

      </div>
   )
}

export default compose<FC>(
   // withCabinetRedirect,
   // withAuthRedirect,
   withRouter
)(Refs_m)