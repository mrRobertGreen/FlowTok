import React from 'react';
import {TransverseLoading} from 'react-loadingg';
import styles from "./styles.module.scss"

const Preloader = () => {
	return (
		<div className={styles.wrapper}>
			{/*<div className={styles.background}/>*/}
			<TransverseLoading color="#00cf7b" speed={1}/>
		</div>
	)
};

export default Preloader;