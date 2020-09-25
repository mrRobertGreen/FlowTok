import React, {FC} from "react";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styles from "./styles.module.scss"
import backArrow from "../../media/icons/back_arrow.svg"
import {Logo} from "../Logo/Logo";


type PropsType = {
   label: string
   logo?: boolean

}

const TopNavbar: FC<PropsType & RouteComponentProps> = ({
                                                           label,
                                                           logo,
                                                           history
                                                        }) => {
   const goBack = () => {
      history.goBack()
   }

   const separatorStyle = {
      borderBottom: "1px solid rgba(0, 0, 0, 0.15)"
   }

   return (
      <div className={styles.wrapper} style={logo ?  {} : separatorStyle}>
         {logo && <Logo/>}
         {!logo && <img src={backArrow} alt="" onClick={goBack} className={styles.backIcon}/>}
         <div className={styles.label}>
            {label}
         </div>
      </div>

   )
}

export default withRouter(TopNavbar)