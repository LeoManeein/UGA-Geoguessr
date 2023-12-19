import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import GoogleStreetViewWindow from "./GoogleMaps/GoogleStreetViewWindow";
import GoogleMapWindow from "./GoogleMaps/GoogleMapWindow";
import LoadingSpinner from "../LoadingSpinner";
import Compass from "./GoogleMaps/Compass";
import ScoreWindow from "./ScoreWindow/ScoreWindow";
import styles from "../../Globals.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Game, difficultyType } from "../../pages/GamePage";
import ResultsWindow from "./ScoreWindow/ResultsWindow";
type LatLngLiteral = google.maps.LatLngLiteral;

interface Props {
	data: Game;
	_id: String;
	answerLocation: LatLngLiteral;
	setCurrentStageNumber: Function;
	nextStage: number | null;
	difficulty: difficultyType | null;
	
}

/**
 * @param _id: id to the current game
 * @param answerLocation: The correct answer location. Will be used to display the street view and calculate the score/distance to the selected location
 * @param setCurrentStageNumber: Helper function that will be used to change the stage of the game
 * @param nextStage: The index of the next stage or null
 * @returns
 */
const GameWindow: React.FC<Props> = ({ _id, answerLocation, setCurrentStageNumber, nextStage, difficulty,data }) => {
	// Loads the google maps
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});

	// The default position that the google maps starts at
	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	// The location that is selected on the map when the user clicks on it
	const [selectedCoordinate, setSelectedCoordinate] = useState<LatLngLiteral | null>(null);

	const [showScoreWindow, setShowScoreWindow] = useState<null | {
		score: number;
		percentage: number;
		distance: number;
		selectedCoordinate: LatLngLiteral;
		answerLocation: LatLngLiteral;
	}>(null);

	const [showResultsWindow, setShowResultsWindow] = useState<
		| null
		| {
				score: number;
				percentage: number;
				distance: number;
				selectedLocation: LatLngLiteral;
				answerLocation: LatLngLiteral;
		  }[]
	>(null);
	const [heading, setHeading] = useState(0);

	if (!isLoaded) return <LoadingSpinner />;
	if (loadError) return <div>Error</div>;

	return (
		<div className="h-screen relative overflow-x-hidden overflow-y-hidden">
			{showResultsWindow && !showScoreWindow && (
				<ResultsWindow
				data={data}
					showResultsWindow={showResultsWindow}
					setCurrentStageNumber={setCurrentStageNumber}
					nextStage={nextStage}
				></ResultsWindow>
			)}
			<div>
				<Link to="/availablegames" className="absolute top-0 right-2 z-20 text-white">
					{/* <Header></Header> */}
					<CloseOutlined className="hover:text-yellow-500" />
				</Link>
				{showScoreWindow && selectedCoordinate && (
					<ScoreWindow
						setShowScoreWindow={setShowScoreWindow}
						showScoreWindow={showScoreWindow}
						setCurrentStageNumber={setCurrentStageNumber}
						nextStage={nextStage}
					></ScoreWindow>
				)}

				{!showScoreWindow && !showResultsWindow && (
					<div className="flex w-full h-screen relative">
						<GoogleStreetViewWindow
							setHeading={setHeading}
							coordinate={answerLocation}
							difficulty={difficulty}
						></GoogleStreetViewWindow>
						<div className={`absolute bottom-6 right-2  w-[300px]  sm:h-[250px] z-10  ${styles.mapct}`}>
							<GoogleMapWindow
								setShowResultsWindow={setShowResultsWindow}
								answerLocation={answerLocation}
								defaultMapCoordinate={defaultMapCoordinate}
								selectedCoordinate={selectedCoordinate}
								setSelectedCoordinate={setSelectedCoordinate}
								setShowScoreWindow={setShowScoreWindow}
								_id={_id}
								nextStage={nextStage}
							></GoogleMapWindow>
						</div>

						<div
							className={`absolute -top-24 left-1/2 transform -translate-x-1/2 p-4 z-30 ${
								difficulty?.compass === false ? "hidden" : ""
							}`}
						>
							<Compass heading={heading}></Compass>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GameWindow;
