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
import {RefDataType, ReferralT} from "../../../../api/user-api";
import {Separator} from "../../../Separator/Separator";
import {useMedia} from "react-media";
import {GLOBAL_MEDIA_QUERIES} from "../../../Page/Page";
import separatorY from "../../../../media/icons/separator_y.svg"

type PropsType = {
   refData: ReferralT
}

export const Refs: FC<PropsType> = ({refData}) => {
   const [isCopied, setIsCopied] = useState(false)

   const queries = useMedia({queries: GLOBAL_MEDIA_QUERIES})

   const onCopy = async (text: string) => {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
   }

   const {link, money, referrals} = refData

   return (
      <div className={styles.wrapper}>
         <div>
            <div className={styles.title}>
               Реферальная программа
            </div>
            <div className={styles.row}>
               <div className={styles.input}>
                  <Input type="text" readOnly={true} value={link} mod={"grey"}/>
               </div>
               <div className={styles.btn}>
                  <Button mod={queries.largeTablet ? "gradient" : "copy"} onClick={() => onCopy(link)}>
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
                  {(Object.keys(referrals)as Array<keyof typeof referrals>).map((key, idx) => (
                     <>
                        {referrals[key] !== 0 && <div>{idx + 1}: {referrals[key]}</div>}
                     </>
                  ))}
               </div>
            </div>
            {queries.largeTablet && <Separator m={"20px 0"}/>}
            <div className={styles.item}>
               <div className={styles.label}>
                  Заработано всего
               </div>
               <div className={styles.numbers}>
                  {money}₽
               </div>
            </div>
         </div>
      </div>
   )
}
