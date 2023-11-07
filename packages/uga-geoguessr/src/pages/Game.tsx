import { useState, useEffect } from "react";
import ExampleGameThing from "../components/ExampleGame/ExampleGameThing";
import RootLayout from "./Root";
import MoonLoader from "react-spinners/MoonLoader";
import { useNavigate, useParams } from "react-router-dom";
import GameWindow from "../components/Game/GameWindow";

type LatLngLiteral = google.maps.LatLngLiteral;
type Game = {
	id: String;
	currentStage: number;
	numberOfStages: number;
	stages: {
		score: null | number;
		answerLocation: LatLngLiteral;
	}[];
};
function Game() {
	const navigate = useNavigate();
	const params = useParams();
	console.log(params.id);
	const [currentStageNumber, setCurrentStageNumber] = useState<null | number>(null);
	const [data, setData] = useState<Game | null>(null);
	const [correctAnswerLocation, setCorrectAnswerLocation] = useState<LatLngLiteral | null>(null);

	useEffect(() => {
		fetch(`/api/game/${params.id}`)
			.then((response) => response.json())
			.then((data: Game) => {
				const currentStageObject = data.stages[data.currentStage];
				if (!currentStageObject.score) {
					setData(data);
					setCurrentStageNumber(data.currentStage);
				}
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				navigate("/Error/GameNotFound");
			});
	}, []);

	useEffect(() => {
		if (currentStageNumber === null || !data) return;
		setCorrectAnswerLocation(data.stages[currentStageNumber].answerLocation);
	}, [currentStageNumber, data]);

	if (!correctAnswerLocation) {
		return (
			<RootLayout>
				<div className="flex items-center justify-center h-screen">
					<MoonLoader></MoonLoader>
				</div>
			</RootLayout>
		);
	}
	return (
		<div className="overflow-hidden">
			{/* Temporary way to switch between the stages */}
			<div className="flex gap-2">
				<div
					onClick={() => {
						setCurrentStageNumber(0);
					}}
					className="bg-blue-200"
				>
					Stage 1
				</div>
				<div
					onClick={() => {
						setCurrentStageNumber(1);
					}}
					className="bg-blue-200"
				>
					Stage 2
				</div>
				<div
					onClick={() => {
						setCurrentStageNumber(2);
					}}
					className="bg-blue-200"
				>
					Stage 3
				</div>
			</div>
			{data &&
				data.stages.map((current, index) => {
					if (index !== currentStageNumber) return <></>;
					return <GameWindow answerLocation={current.answerLocation}></GameWindow>;
				})}
			{/* <ExampleGameThing answerLocation={correctAnswerLocation}></ExampleGameThing>; */}
		</div>
	);
}

export default Game;
