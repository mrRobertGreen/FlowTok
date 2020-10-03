import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {RootStateType} from "../../../../redux/store";
import {useCache} from "../../../../hooks/useCache";
import {getRefData} from "../../../../redux/user/user-reducer";
import Button from "../../../Button/Button";
import {Input} from "../../../Input/Input";
import {RefDataType} from "../../../../api/user-api";
import {Separator} from "../../../Separator/Separator";
import {useMedia} from "react-media";
import {GLOBAL_MEDIA_QUERIES} from "../../../Page/Page";
import separatorY from "../../../../media/icons/separator_y.svg"

type PropsType = {}

const Refs: FC<PropsType & RouteComponentProps> = ({history}) => {
   const dispatch = useDispatch()
   // let refData = useSelector((state: RootStateType) => state.user.refData)
   const refData: RefDataType = {
      value: 890.00,
      link: "https://flowtok.com/ref/5f3eba819845264b903e746f",
      refs: 17
   }
   let blogProfile = useSelector((state: RootStateType) => state.user.blogProfile)
   const blogProfileCache = useCache("blogProfile")

   if (blogProfileCache && !blogProfile) {
      blogProfile = blogProfileCache
   }

   useEffect(() => {
      if (!refData) dispatch(getRefData())
   }, [refData, dispatch])

   const [isCopied, setIsCopied] = useState(false)

   const queries = useMedia({queries: GLOBAL_MEDIA_QUERIES})

   // if (!refData) return <Preloader/>

   const onCopy = async (text: string) => {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
   }

   return (
      <div className={styles.wrapper}>
         <div>
            <div className={styles.title}>
               Реферальная программа
            </div>
            <div className={styles.row}>
               <div className={styles.input}>
                  <Input type="text" readOnly={true} value={refData.link} mod={"grey"}/>
               </div>
               <div className={styles.btn}>
                  <Button mod={queries.largeTablet ? "gradient" : "copy"} onClick={() => onCopy(refData.link)}>
                     {queries.largeTablet && "Копировать"}
                  </Button>
               </div>
            </div>
         </div>
         {!queries.largeTablet && <Separator m={"20px 0"}/>}
         <div className={styles.statsBlock}>
            <div className={styles.item}>
               <div className={styles.label}>
                  Кол-во рефералов
               </div>
               <div className={styles.numbers}>
                  {refData.refs}
               </div>
            </div>
            {queries.largeTablet && <Separator m={"20px 0"}/>}
            <div className={styles.item}>
               <div className={styles.label}>
                  Заработано всего
               </div>
               <div className={styles.numbers}>
                  {refData.value}₽
               </div>
            </div>

         </div>
      </div>
   )
}

export default compose<FC>(
   // withCabinetRedirect,
   // withAuthRedirect,
   withRouter
)(Refs)