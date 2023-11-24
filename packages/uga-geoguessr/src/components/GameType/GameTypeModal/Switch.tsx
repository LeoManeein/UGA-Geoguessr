import React, { useState } from "react";
import styles from "./Switch.module.css"; // Import the CSS Module

interface Props {
	isChecked: boolean;
	setFunction: Function;
	text: String;
}

const Switch: React.FC<Props> = ({ isChecked, setFunction, text }) => {
	const [checkboxState, setCheckBoxState] = useState(isChecked || false);

	const handleChange = () => {
		setFunction(!checkboxState);

		setCheckBoxState(!checkboxState);
	};

	return (
		<div className="flex gap-2">
			<div>{text}</div>
			<label className={styles.switch}>
				<input type="checkbox" checked={checkboxState} onChange={handleChange} />
				<div className={styles.slider}></div>
			</label>
		</div>
	);
};

export default Switch;
