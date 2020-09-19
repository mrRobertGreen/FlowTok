import React, {FC} from "react";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styles from "./styles.module.scss"
import backArrow from "../../media/icons/back_arrow.svg"


type PropsType = {
   label: string
}

const TopNavbar: FC<PropsType & RouteComponentProps> = ({
                                                           label,
                                                           history
                                                        }) => {
   const goBack = () => {
      history.goBack()
   }

   return (
      <div className={styles.wrapper}>
         <img src={backArrow} alt="" onClick={goBack} className={styles.backIcon}/>
         <div className={styles.label}>
            {label}
         </div>
      </div>

   )
}

export default withRouter(TopNavbar)