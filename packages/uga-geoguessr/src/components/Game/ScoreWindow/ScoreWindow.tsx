import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import GoogleStreetViewWindow from "../GoogleMaps/GoogleStreetViewWindow";
import GoogleMapWindow from "../GoogleMaps/GoogleMapWindow";
import Header from "../../Header/Header";
import LoadingSpinner from "../../LoadingSpinner";
import Compass from "../GoogleMaps/Compass";
import ScoreGoogleMapWindow from "./ScoreGoogleMapWindow";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../Globals.module.css";
import ScoreMeter from "./ScoreMeter";
import { CloseOutlined } from "@ant-design/icons";
type LatLngLiteral = google.maps.LatLngLiteral;

interface Props {
	answerLocation: LatLngLiteral;
	selectedCoordinate: LatLngLiteral;
	setCurrentStageNumber: Function;
	nextStage: number | null;
}

const ScoreWindow: React.FC<Props> = ({ answerLocation, selectedCoordinate, setCurrentStageNumber, nextStage }) => {
	// Loads the google maps
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});
	const navigate = useNavigate();
	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	const distance = Math.floor(
		coordsToFeet(
			getDistanceFromLatLonInKm(
				answerLocation.lat,
				answerLocation.lng,
				selectedCoordinate.lat,
				selectedCoordinate.lng,
			),
		),
	);

	const maxScore = 5000;

	const score = distance >= maxScore ? 0 : maxScore - distance;

	const percentage = (score / maxScore) * 100;

	// helper function to find the straight distance between 2 lat and long points
	function getDistanceFromLatLonInKm(lat1: number | undefined, lon1: number | undefined, lat2: number, lon2: number) {
		if (!lat1 || !lon1) return 0;

		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}
	function deg2rad(deg: number) {
		return deg * (Math.PI / 180);
	}

	// Uhh this mightttt be right??
	function coordsToFeet(distance: number) {
		return distance * 3280.84;
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
				<ScoreMeter score={score} percentage={percentage} distance={distance}></ScoreMeter>
				<ScoreGoogleMapWindow
					defaultMapCoordinate={defaultMapCoordinate}
					selectedCoordinate={selectedCoordinate}
					locationCoordinate={answerLocation}
				></ScoreGoogleMapWindow>
				<div
					onClick={() => {
						if (nextStage) setCurrentStageNumber(nextStage);
						if (!nextStage) navigate("/AvailableGames");
					}}
					className={` z-30 m-auto w-[192px] text-center flex ${styles.button_light}`}
				>
					<div className="flex m-auto text-center ">{nextStage ? "Next" : "Home"}</div>
				</div>
			</div>
		</div>
	);
};

export default ScoreWindow;
