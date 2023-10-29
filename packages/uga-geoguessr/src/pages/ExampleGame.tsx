import { useEffect, useState } from "react";
import GoogleMapWindow from "../components/GoogleMaps/GoogleMapWindow";
import { useLoadScript } from "@react-google-maps/api";
import GoogleStreetViewMap from "../components/GoogleStreetView/SVMap";
import StreetView from "../components/CustomStreetView/CustomStreetView";

export type Coordinate = {
	x: number;
	y: number;
};

function ExampleGame() {
	// Loads the google maps
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});

	// Toggle for the custom location or google street view.
	const [customLocation, setCustomLocation] = useState(false);
	// The default position that the google maps starts at
	const defaultMapCoordinate = { x: 33.951752641469085, y: -83.37435458710178 } as Coordinate;

	// Temporary constant for the answers locations
	const [locationCoordinate, setLocationCoordinate] = useState<Coordinate>({
		x: 33.95385047418578,
		y: -83.37426165192667,
	});

	// The location that is selected on the map
	const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null);

	// Random example image from google
	const image =
		'https://cdn.discordapp.com/attachments/1054239396024549486/1164765489390682112/timothy-oldfield-luufnHoChRU-unsplash.jpg?ex=65446764&is=6531f264&hm=8c226b2d915319c6bf408d77d6813dfde8b5d0c0feadec863bf68e01ec314a1f&"';

	// Distance between the answer's location and the selected location on the map
	const [distance, setDistance] = useState<Number>(0);

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

	// Checking our distance whenever we select a new location. Ideally all of this will be done on the backend though so the front end cant check the position
	useEffect(() => {
		setDistance(
			getDistanceFromLatLonInKm(
				selectedCoordinate?.x,
				selectedCoordinate?.y,
				locationCoordinate.x,
				locationCoordinate.y,
			),
		);
	}, [selectedCoordinate]);

	if (!isLoaded) return <div>...</div>;
	if (loadError) return <div>Error</div>;

	return (
		<>
			<div className="flex w-min ">
				<button
					onClick={() => {
						setCustomLocation(true);
					}}
					className={customLocation ? "bg-green-200" : "bg-red-200"}
				>
					Custom location
				</button>
				<button
					onClick={() => {
						setCustomLocation(false);
					}}
					className={customLocation ? "bg-red-200" : "bg-green-200"}
				>
					Street view location
				</button>
			</div>
			<div>{`Selected X: ${selectedCoordinate ? selectedCoordinate.x : 0}`}</div>
			<div>{`Selected Y: ${selectedCoordinate ? selectedCoordinate.y : 0}`}</div>
			<div>{`Distance: ${distance}`}</div>
			<div className="flex ">
				{customLocation ? (
					<StreetView image={image}></StreetView>
				) : (
					<GoogleStreetViewMap coordinate={locationCoordinate}></GoogleStreetViewMap>
				)}
				<GoogleMapWindow
					coordinate={defaultMapCoordinate}
					setCoordinate={setSelectedCoordinate}
				></GoogleMapWindow>
			</div>
		</>
	);
}

export default ExampleGame;
