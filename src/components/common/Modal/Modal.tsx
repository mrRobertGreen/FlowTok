import React, {FC, ReactChild} from "react";
import styles from "./styles.module.scss"

type PropsType = {
	isOpen: boolean
	children: ReactChild
}

const Modal: FC<PropsType> = ({children, isOpen}) => {
	if (!isOpen) return <></>
	
	return (
		<>
			<div className={styles.dark}>
				<div className={styles.body}>
					{children}
				</div>
			</div>
		</>
	)
}


export default Modal;