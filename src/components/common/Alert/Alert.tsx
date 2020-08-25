import React, {FC} from "react";
import styles from "./styles.module.scss";
import tickIcon from "../../../media/icons/tick_icon.svg";
import crossIcon from "../../../media/icons/cross_icon.svg";

type PropsType = {
	close: () => void
	message: string
	title: string
	isError: boolean
}

const Alert: FC<PropsType> = ({close, message, title, isError}) => {
	return (
		<div className={styles.main}>
			<div>
				<div className={styles.picborder}>
					<img src={isError ? crossIcon : tickIcon} alt="" className={styles.pic}/>
				</div>
				<p className={styles.header}>{title}</p>
				<p className={styles.txt}>{message}</p>
			</div>

			<div>
				<button className={styles.button} onClick={close}>Закрыть</button>
			</div>
		</div>
	)
};

export default Alert;