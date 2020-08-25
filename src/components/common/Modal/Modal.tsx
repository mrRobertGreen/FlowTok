import React, {ReactChild, useEffect} from "react";
import {createPortal} from "react-dom";
import styles from "./styles.module.scss"

// 'modal-root' is a sibling to 'app-root'
const modalRoot = document.getElementById("root");

type PropsType = {
	isOpen: boolean
	children: ReactChild
}

const Modal = ({isOpen, children}: PropsType) => {
	const div = document.createElement("div");

	useEffect(() => {
		if (modalRoot) modalRoot.appendChild(div);

		return () => {
			if (modalRoot) modalRoot.removeChild(div);
		};
	}, [div]);

	return (
		isOpen &&
		createPortal(
			<div className={styles.main}>
				{children}
				<div className={styles.dark}>
				</div>
			</div>,
			// target container
			div
		)
	);
}

export default Modal;