import { useLoadScript } from "@react-google-maps/api";
import LoadingSpinner from "../../LoadingSpinner";
import ScoreGoogleMapWindow from "./ScoreGoogleMapWindow";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../Globals.module.css";
import ScoreMeter from "./ScoreMeter";
import { CloseOutlined } from "@ant-design/icons";
type LatLngLiteral = google.maps.LatLngLiteral;

interface Props {
	setCurrentStageNumber: Function;
	nextStage: number | null;
	showScoreWindow: {
		score: number;
		percentage: number;
		distance: number;
		selectedCoordinate: LatLngLiteral;
		answerLocation: LatLngLiteral;
	};
	setShowScoreWindow: Function;
}

const ScoreWindow: React.FC<Props> = ({ setCurrentStageNumber, nextStage, showScoreWindow, setShowScoreWindow }) => {
	// Loads the google maps
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});
	const { score, percentage, distance } = showScoreWindow;
	const navigate = useNavigate();
	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	if (!isLoaded) return <LoadingSpinner></LoadingSpinner>;
	if (loadError) return <div>Error</div>;

	return (
		<div className="h-screen relative overflow-x-hidden overflow-y-hidden flex flex-col">
			<Link to="/availablegames" className="absolute top-0 right-2 z-20 text-white">
				{/* <Header></Header> */}
				<CloseOutlined />
			</Link>

			<div className="flex w-full px-2 md:px-0 md:w-[768px] h-[400px] m-auto relative flex-col gap-y-2">
				<ScoreMeter text={"SCORE"} score={score} percentage={percentage} distance={distance}></ScoreMeter>
				<ScoreGoogleMapWindow
					defaultMapCoordinate={defaultMapCoordinate}
					selectedCoordinate={showScoreWindow.selectedCoordinate}
					locationCoordinate={showScoreWindow.answerLocation}
				></ScoreGoogleMapWindow>
				<div
					onClick={() => {
						if (nextStage) setCurrentStageNumber(nextStage);
						if (!nextStage) setShowScoreWindow(false);
					}}
					className={` z-30 m-auto w-[192px] text-center flex ${styles.button_light}`}
				>
					<div className="flex m-auto text-center ">{nextStage ? "Next" : "Results"}</div>
				</div>
			</div>
		</div>
	);
};

export default ScoreWindow;
