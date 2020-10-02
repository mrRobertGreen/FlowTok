import React, {FC} from "react";
import styles from "./styles.module.scss";
import tickIcon from "../../../media/icons/tick_icon.svg";
import crossIcon from "../../../media/icons/cross_icon.svg";
import closeIcon from "../../../media/icons/close_icon.svg";
import Button from "../../Button/Button";

type PropsType = {
   onClose: () => void
   message: string
   title: string
   isError: boolean
   btnText?: string
   onClickBtn?: () => void
}

const Alert: FC<PropsType> = ({
                                 onClose,
                                 message,
                                 title,
                                 isError,
                                 btnText,
                                 onClickBtn
                              }) => {
   return (
      <div className={styles.wrapper}>
			<div className={styles.cross} onClick={onClose}>
				<img src={closeIcon} alt=""/>
			</div>
         <div className={styles.icon}>
            <img src={isError ? crossIcon : tickIcon} alt=""/>
         </div>
         <div className={styles.title}>
            {title}
         </div>
         <div className={styles.message}>
            {message}
         </div>
			{btnText && <Button onClick={onClickBtn} mod={"black"}>
				{btnText}
			</Button>}
      </div>
   )
};

export default Alert;