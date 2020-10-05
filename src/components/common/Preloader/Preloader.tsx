import React from 'react';
import styles from "./styles.module.scss"

const Preloader = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.circle}/>
			</div>
		</div>
	)
};

export default Preloader;