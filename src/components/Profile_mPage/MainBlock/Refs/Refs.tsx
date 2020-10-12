import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {RootStateType} from "../../../../redux/store";
import {useCache} from "../../../../hooks/useCache";
import {getContainers} from "../../../../redux/user/user-reducer";
import Button from "../../../Button/Button";
import {Input} from "../../../Input/Input";
import {RefDataType, ReferralT} from "../../../../api/user-api";
import {Separator} from "../../../Separator/Separator";
import {useMedia} from "react-media";
import {GLOBAL_MEDIA_QUERIES} from "../../../Page/Page";
import separatorY from "../../../../media/icons/separator_y.svg"
import {useTranslation} from "react-i18next";

type PropsType = {
   refData: ReferralT
}

export const Refs: FC<PropsType> = ({refData}) => {
   const [isCopied, setIsCopied] = useState(false)

   const queries = useMedia({queries: GLOBAL_MEDIA_QUERIES})
   const {t} = useTranslation()

   const onCopy = async (text: string) => {
      await navigator.clipboard.writeText(text)
      console.log("click")
      setIsCopied(true)
      setTimeout(() => {
         setIsCopied(false)
      }, 3000)
   }

   const {link, money, referrals} = refData

   return (
      <div className={styles.wrapper}>
         <div>
            <div className={styles.title}>
               {t("refs-title")}
            </div>
            <div className={styles.row}>
               <div className={styles.input}>
                  <Input type="text" readOnly={true} value={link} mod={"grey"}/>
               </div>
               <div className={styles.btn}>
                  <Button
                     mod={queries.largeTablet ? "gradient" : "copy"}
                     onClick={() => onCopy(link)}
                     disabled={isCopied}
                     style={{background: isCopied ? "#00BA32" : ""}}
                  >
                     {queries.largeTablet && t("refs-btn")}
                  </Button>
               </div>
            </div>
         </div>
         {!queries.largeTablet && <Separator m={"20px 0"}/>}
         <div className={styles.statsBlock}>
            <div className={styles.item}>
               <div className={styles.label}>
                  {t("refs-count")}
               </div>
               <div className={styles.numbers}>
                  {(Object.keys(referrals)as Array<keyof typeof referrals>).map((key, idx) => (
                     <div key={idx}>
                        {referrals[key] !== 0 || key === "a" && <div>{idx + 1}: {referrals[key]}</div>}
                     </div>
                  ))}
               </div>
            </div>
            {queries.largeTablet && <Separator m={"20px 0"}/>}
            <div className={styles.item}>
               <div className={styles.label}>
                  {t("refs-earned")}
               </div>
               <div className={styles.numbers}>
                  {money}₽
               </div>
            </div>
         </div>
      </div>
   )
}
