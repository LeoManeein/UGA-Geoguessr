import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import GoogleStreetViewWindow from "./GoogleMaps/GoogleStreetViewWindow";
import GoogleMapWindow from "./GoogleMaps/GoogleMapWindow";
import Header from "../Header/Header";
import LoadingSpinner from "../LoadingSpinner";
import Compass from "./GoogleMaps/Compass";
import ScoreWindow from "./ScoreWindow/ScoreWindow";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
type LatLngLiteral = google.maps.LatLngLiteral;

interface Props {
	answerLocation: LatLngLiteral;
	setCurrentStageNumber: Function;
	nextStage: number | null;
}

const GameWindow: React.FC<Props> = ({ answerLocation, setCurrentStageNumber, nextStage }) => {
	// Loads the google maps
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});

	// The default position that the google maps starts at
	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	//  constant for the answers locations
	const [locationCoordinate, setLocationCoordinate] = useState<LatLngLiteral>(answerLocation);

	// The location that is selected on the map when the user clicks on it
	const [selectedCoordinate, setSelectedCoordinate] = useState<LatLngLiteral | null>(null);

	const [showScoreWindow, setShowScoreWindow] = useState(false);

	const [heading, setHeading] = useState(0);

	if (!isLoaded) return <LoadingSpinner />;
	if (loadError) return <div>Error</div>;

	return (
		<div className="h-screen relative overflow-x-hidden overflow-y-hidden">
			<Link to="/availablegames" className="absolute top-0 right-2 z-20 text-white">
				{/* <Header></Header> */}
				<CloseOutlined />
			</Link>
			{showScoreWindow && selectedCoordinate && (
				<ScoreWindow
					answerLocation={answerLocation}
					selectedCoordinate={selectedCoordinate}
					setCurrentStageNumber={setCurrentStageNumber}
					nextStage={nextStage}
				></ScoreWindow>
			)}
			{!showScoreWindow && (
				<div className="flex w-full h-screen relative">
					<GoogleStreetViewWindow
						setHeading={setHeading}
						coordinate={locationCoordinate}
					></GoogleStreetViewWindow>
					<div
						className={`absolute bottom-6 right-2  w-[300px]  h-[250px] z-10  transition-transform md:hover:w-[700px] md:hover:h-[400px] `}
					>
						<GoogleMapWindow
							defaultMapCoordinate={defaultMapCoordinate}
							selectedCoordinate={selectedCoordinate}
							setSelectedCoordinate={setSelectedCoordinate}
							locationCoordinate={locationCoordinate}
							setShowScoreWindow={setShowScoreWindow}
						></GoogleMapWindow>
					</div>

					<div className={`absolute -top-24 left-1/2 transform -translate-x-1/2 p-4 z-30`}>
						<Compass heading={heading}></Compass>
					</div>
				</div>
			)}
		</div>
	);
};

export default GameWindow;
