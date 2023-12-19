import "./ScoreMeter.css";
import styles from "../../../Globals.module.css";
import { useEffect, useState } from "react";
interface Props {
	score: number;
	percentage: number;
	distance: number;
	text: string;
}

const ScoreMeter: React.FC<Props> = ({ score, percentage, distance, text }) => {
	const widthStyle = {
		width: `${percentage}%`,
	};
	const [scoreAnimation, setScoreAnimation] = useState("0");
	useEffect(() => {
		let start = 0;
		const end = parseInt(score.toString().substring(0, 2));
		if (start === end) return;

		let totalMilSecDur = 2;
		let incrementTime = (totalMilSecDur / end) * 1000;
		let timer = setInterval(() => {
			start += 1;
			setScoreAnimation(String(start) + score.toString().substring(2));
			if (start === end) {
				clearInterval(timer);
			}
		}, incrementTime);
	}, [score]);

	return (
		<>
			<div
				className={`flex w-full text-center justify-center ${styles.light_background} text-white justify-center text-center text-3xl  font-bold rounded-md`}
			>
				{text}
			</div>
			<div className="flex w-full justify-between text-white font-bold text-xl">
				<div>Distance: {distance} ft</div>
				<div>{scoreAnimation} points</div>
			</div>
			<div className="meter">
				<span style={widthStyle}>
					<span className="progress"></span>
				</span>
			</div>
		</>
	);
};

export default ScoreMeter;
