import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameWindow from "../components/Game/GameWindow";
import styles from "../Globals.module.css";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
type LatLngLiteral = google.maps.LatLngLiteral;

/**
 * Represents a GAME the user is currently playing.
 *
 * Contains an array of stages that contain the correct locations
 *
 * A GAME is created by using the possible locations from a GAMETYPE
 *
 * Notice the difference between a GAME and GAMETYPE
 */
export type difficultyType = {
	zoom: boolean;
	compass: boolean;
	movement: boolean;
};
export type Game = {
	id: String;
	currentStage: number;
	numberOfStages: number;
	stages: {
		score: null | number;
		answerLocation: LatLngLiteral;
	}[];
	difficulty: difficultyType;
};

/**
 * @returns A fullscreen window that displays a geoguessr game of the location fetched from the /game/:id
 */
function GamePage() {
	const navigate = useNavigate();
	const params = useParams();
	const [currentStageNumber, setCurrentStageNumber] = useState<null | number>(null);
	const [data, setData] = useState<Game | null>(null);
	const [correctAnswerLocation, setCorrectAnswerLocation] = useState<LatLngLiteral | null>(null);

	const dummyDifficulty = {
		zoom: true,
		compass: true,
		movement: true,
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:4000/api/games/${params.id}`);
				const data = response.data;
				console.log("data", data);
				const currentStageObject = data.stages[data.currentStage];
				if (!currentStageObject.score) {
					setData(data);
					setCurrentStageNumber(data.currentStage);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				navigate("/Error/GameNotFound");
			}
		};
		fetchData();
	}, [params.id, navigate]);

	useEffect(() => {
		if (currentStageNumber === null || !data) return;
		setCorrectAnswerLocation(data.stages[currentStageNumber].answerLocation);
	}, [currentStageNumber, data]);

	if (!correctAnswerLocation) {
		return <LoadingSpinner></LoadingSpinner>;
	}
	return (
		<div className={`overflow-hidden relative ${styles.background}`}>
			{data &&
				data.stages.map((current, index) => {
					if (index !== currentStageNumber)
						return <div className="hidden" key={Math.random() + "lol" + index}></div>;

					let nextStage: number | null = index + 1;
					if (nextStage === data.numberOfStages) {
						nextStage = null;
					}

					return (
						<GameWindow
							key={Math.random() + "abc" + index + current.answerLocation.lat}
							answerLocation={current.answerLocation}
							setCurrentStageNumber={setCurrentStageNumber}
							nextStage={nextStage}
							difficulty={data.difficulty || dummyDifficulty}
						></GameWindow>
					);
				})}
		</div>
	);
}

export default GamePage;
