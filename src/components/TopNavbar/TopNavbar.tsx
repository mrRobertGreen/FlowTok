import React, {FC} from "react";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styles from "./styles.module.scss"
import backArrow from "../../media/icons/back_arrow.svg"
import {Logo} from "../Logo/Logo";
import {useMedia} from "react-media";
import {GLOBAL_MEDIA_QUERIES} from "../Page/Page";


type PropsType = {
   label: string
   logo?: boolean
   avatarUrl?: string
   br?: string
   subLabel?: string
}

const TopNavbar: FC<PropsType & RouteComponentProps> = ({
                                                           label,
                                                           logo,
                                                           avatarUrl,
                                                           br,
                                                           history,
                                                           subLabel
                                                        }) => {
   const goBack = () => {
      history.goBack()
   }

   const style = {
      borderBottom: logo ? "" : "1px solid rgba(0, 0, 0, 0.15)",
      borderRadius: br,
   }

   const matches = useMedia({queries: GLOBAL_MEDIA_QUERIES})

   if (matches.largeTablet) return <></>

   return (
      <div className={styles.wrapper} style={style}>
         {logo && <Logo/>}
         {!logo && <img src={backArrow} alt="" onClick={goBack} className={styles.backIcon}/>}
         <div className={styles.label}>
            {label}
            {subLabel && <div className={styles.name}>
               {subLabel}
	         </div>}
         </div>

         {avatarUrl && <img src={avatarUrl} alt="" className={styles.avatar}/>}
      </div>

   )
}

export default withRouter(TopNavbar)