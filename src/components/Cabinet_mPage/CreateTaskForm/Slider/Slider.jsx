import React from "react";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import styles from "./styles.module.scss"
import usersIcon from "../../../../media/icons/users_icon.png"
import brilliantIcon from "../../../../media/icons/brilliant_icon.png"

const Slider = ({value, setValue}) => {

	return (
		<div className={styles.wrapper}>
			<RangeSlider
				value={value}
				onChange={changeEvent => setValue(changeEvent.target.value)}
				variant={"my"}
				tooltip={"off"}
			/>
			<div className={styles.values}>
				<div className={styles.item}>
					<img src={usersIcon} alt=""/>
					<div>{value}%</div>
				</div>
				<div className={styles.item}>
					<img src={brilliantIcon} alt=""/>
					<div>{100-value}%</div>
				</div>
			</div>
		</div>
	)
}
export default Slider