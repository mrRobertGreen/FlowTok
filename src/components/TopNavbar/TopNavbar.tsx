import React, {FC} from "react";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styles from "./styles.module.scss"
import backArrow from "../../media/icons/back_arrow.svg"
import {Logo} from "../Logo/Logo";


type PropsType = {
   label: string
   logo?: boolean
   avatarUrl?: string
   br?: string
}

const TopNavbar: FC<PropsType & RouteComponentProps> = ({
                                                           label,
                                                           logo,
                                                           avatarUrl,
                                                           br,
                                                           history
                                                        }) => {
   const goBack = () => {
      history.goBack()
   }

   const style = {
      borderBottom: logo ? "" : "1px solid rgba(0, 0, 0, 0.15)",
      borderRadius: br,
   }

   return (
      <div className={styles.wrapper} style={style}>
         {logo && <Logo/>}
         {!logo && <img src={backArrow} alt="" onClick={goBack} className={styles.backIcon}/>}
         <div className={styles.label}>
            {label}
         </div>
         {avatarUrl && <img src={avatarUrl} alt="" className={styles.avatar}/>}
      </div>

   )
}

export default withRouter(TopNavbar)