import { useLoadScript } from "@react-google-maps/api";
import LoadingSpinner from "../../LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../Globals.module.css";
import ScoreMeter from "./ScoreMeter";
import { CloseOutlined } from "@ant-design/icons";
import ResultsGoogleMapWindow from "./ResultsGoogleMapWindow";
import axios from "axios";
import { Game } from "../../../pages/GamePage";
type LatLngLiteral = google.maps.LatLngLiteral;

interface Props {
	setCurrentStageNumber: Function;
	nextStage: number | null;
	showResultsWindow: {
		score: number;
		percentage: number;
		distance: number;
		selectedLocation: LatLngLiteral;
		answerLocation: LatLngLiteral;
	}[];
	data: Game;
}

const ResultsWindow: React.FC<Props> = ({ setCurrentStageNumber, nextStage, showResultsWindow, data }) => {
	// Loads the google maps
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});
	// const { score, percentage, distance } = showScoreWindow;

	let score = 0;
	let distance = 0;
	showResultsWindow.forEach((current) => {
		score += current.score;
		distance += current.distance;
	});

	let percentage = (score / (5000 * showResultsWindow.length)) * 100;

	const navigate = useNavigate();

	async function handleGameRequest() {
		try {
			let token = localStorage.getItem("auth-token");
			const headers = token
				? {
						headers: {
							"Content-Type": "application/json",
							"x-auth-token": token,
						},
				  }
				: {
						headers: {
							"Content-Type": "application/json",
						},
				  };
			const response = await axios.post(
				`http://localhost:4000/api/games`,
				{
					gameType: { _id: data.gameTypeId, title: data.gameTypeTitle },
					numberOfStages: data.numberOfStages,
					difficulty: data.difficulty,
				},
				headers,
			);

			if (response.status === 200) {
				const data = response.data;
				navigate(`${data}`);
			} else {
				throw new Error("whoops");
			}
		} catch (error: any) {
			// Handle network errors or other exceptions here
			console.error(error?.response?.data?.msg || error?.message || "error");
		}
	}

	if (!isLoaded) return <LoadingSpinner></LoadingSpinner>;
	if (loadError) return <div>Error</div>;

	return (
		<div className="h-screen relative overflow-x-hidden overflow-y-hidden flex flex-col">
			<Link to="/availablegames" className="absolute top-0 right-2 z-20 text-white">
				{/* <Header></Header> */}
				<CloseOutlined />
			</Link>

			<div className="flex w-full px-2 md:px-0 md:w-[768px] h-[400px] m-auto relative flex-col gap-y-2">
				<ScoreMeter text={"RESULTS"} score={score} percentage={percentage} distance={distance}></ScoreMeter>
				<ResultsGoogleMapWindow data={showResultsWindow}></ResultsGoogleMapWindow>
				<div className="flex justify-around">
					<div
						onClick={() => {
							handleGameRequest();
						}}
						className={` z-30  w-[192px] text-center flex ${styles.button_light}`}
					>
						<div className="flex m-auto text-center ">Play again</div>
					</div>
					<div
						onClick={() => {
							navigate("/AvailableGames");
						}}
						className={` z-30  w-[192px] text-center flex ${styles.button_light}`}
					>
						<div className="flex m-auto text-center ">Home</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultsWindow;
