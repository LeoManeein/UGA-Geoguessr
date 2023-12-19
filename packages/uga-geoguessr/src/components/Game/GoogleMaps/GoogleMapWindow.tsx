import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef } from "react";
import styles from "../../../Globals.module.css";
import axios from "axios";
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
interface Props {
	setSelectedCoordinate: Function;
	defaultMapCoordinate: LatLngLiteral;
	selectedCoordinate: LatLngLiteral | null;
	setShowScoreWindow: Function;
	nextStage: number | null;
	_id: String;
	answerLocation: LatLngLiteral;
	setShowResultsWindow: Function;
}

/**
 *
 * @param setSelectedCoordinate: Function that sets the currently selected coordinate when a position is clicked on the google map
 * @param defaultMapCoordinate: The default center point of the google map. probably should be the center of UGA campus
 * @param selectedCoordinate: The currently selected latlng point on the google map.
 * @param setShowScoreWindow: When submit is clicked this function will make the score window display
 * @returns A google map window the user can click to select points, and a button to submit the selected point
 */
const GoogleMapWindow: React.FC<Props> = ({
	setSelectedCoordinate,
	defaultMapCoordinate,
	selectedCoordinate,
	setShowScoreWindow,
	nextStage,
	answerLocation,
	setShowResultsWindow,
	_id,
}) => {
	const mapRef = useRef<GoogleMap>();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const center = useMemo<LatLngLiteral>(() => ({ lat: defaultMapCoordinate.lat, lng: defaultMapCoordinate.lng }), []);
	const onLoadF = (marker: any) => {};

	const options = useMemo<MapOptions>(
		() => ({
			mapId: "b181cac70f27f5e6",
			disableDefaultUI: true,
			clickableIcons: false,
		}),
		[],
	);
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
	const onLoad = useCallback((map: any) => (mapRef.current = map), []);
	if (!window.google) return <div></div>;

	return (
		<div className="w-full h-full ">
			<div className="w-full flex flex-col h-full bg-grey-500 ">
				<GoogleMap
					zoom={14}
					center={center}
					mapContainerClassName=" w-full h-full rounded-md"
					options={options}
					onLoad={onLoad}
					onClick={(event) => {
						// console.log(event);
						const newcoordinate = {
							lat: event.latLng?.lat(),
							lng: event.latLng?.lng(),
						} as LatLngLiteral;
						setSelectedCoordinate(newcoordinate);
					}}
				>
					{selectedCoordinate && <MarkerF onLoad={onLoadF} position={selectedCoordinate} />}
				</GoogleMap>
				<div
					onClick={async () => {
						if (!selectedCoordinate) return;
						try {
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

							const percentage = Math.ceil((score / maxScore) * 100);
							const newthing = { score, percentage, distance, selectedCoordinate, answerLocation };

							// helper function to find the straight distance between 2 lat and long points

							console.log("made request");

							let token = localStorage.getItem("auth-token");
							const headers = token
								? {
										headers: {
											"x-auth-token": token,
										},
								  }
								: {};
							const response = await axios.put(
								`${process.env.REACT_APP_BACKEND}/api/games/${_id}`,
								{
									nextStage,
									...newthing,
								},
								headers,
							);
							await response.data;
							if (!nextStage) setShowResultsWindow(response.data.stages);
							setShowScoreWindow(newthing);
						} catch (error: any) {
							console.error(error?.message || "error");
						}
						//setShowScoreWindow(true);
					}}
					className={`  w-full  h-[50px] z-50  text-center pt-[4px] mt-1 ${
						selectedCoordinate ? styles.button : styles.invalidButton
					} `}
				>
					SUBMIT
				</div>
			</div>
		</div>
	);
};

export default GoogleMapWindow;
