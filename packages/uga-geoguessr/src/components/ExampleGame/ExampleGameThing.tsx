import { useEffect, useState } from "react";
import GoogleMapWindow from "../GoogleMaps/GoogleMapWindow";
import { useLoadScript } from "@react-google-maps/api";
import GoogleStreetViewMap from "../GoogleStreetView/GoogleStreetViewMap";
import StreetView from "../CustomStreetView/CustomStreetView";

type LatLngLiteral = google.maps.LatLngLiteral;

interface Props {
	answerLocation: LatLngLiteral;
}

const ExampleGameThing: React.FC<Props> = ({ answerLocation }) => {
	// Loads the google maps
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});

	// Toggle for the custom location or google street view.
	const [customLocation, setCustomLocation] = useState(false);
	// The default position that the google maps starts at
	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	//  constant for the answers locations
	const [locationCoordinate, setLocationCoordinate] = useState<LatLngLiteral>(answerLocation);

	// The location that is selected on the map when the user clicks on it
	const [selectedCoordinate, setSelectedCoordinate] = useState<LatLngLiteral | null>(null);

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

	// Uhh this mightttt be right??
	function coordsToFeet(distance: number) {
		return distance * 3280.84;
	}

	// Checking our distance whenever we select a new location. Ideally all of this will be done on the backend though so the front end cant check the position
	useEffect(() => {
		setDistance(
			getDistanceFromLatLonInKm(
				selectedCoordinate?.lat,
				selectedCoordinate?.lng,
				locationCoordinate.lat,
				locationCoordinate.lng,
			),
		);
	}, [selectedCoordinate]);

	// Jank way of creating a new game rn
	function reloadPage() {
		window.location.reload();
	}

	if (!isLoaded) return <div>...</div>;
	if (loadError) return <div>Error</div>;

	return (
		<>
			<div className="flex">
				<div className="flex w-min ">
					<button
						onClick={() => {
							setCustomLocation(true);
						}}
						className={customLocation ? "bg-green-200" : "bg-red-200"}
					>
						Custom location (for testing custom panoramas)
					</button>
					<button
						onClick={() => {
							setCustomLocation(false);
						}}
						className={customLocation ? "bg-red-200" : "bg-green-200"}
					>
						Street view location (using google maps)
					</button>
				</div>
				<div className="m-2 text-xl text-white-500 bg-blue-300 w-min" onClick={reloadPage}>
					PLAY AGAIN
				</div>
				<div>
					<div>{`Selected lat: ${selectedCoordinate ? selectedCoordinate.lat : 0}`}</div>
					<div>{`Selected lng: ${selectedCoordinate ? selectedCoordinate.lng : 0}`}</div>
					<div>{`Distance: ${distance}`}</div>
					<div>{`Feet: ${coordsToFeet(distance as number)}`}</div>
				</div>
			</div>

			<div className="flex ">
				{customLocation ? (
					<StreetView image={image}></StreetView>
				) : (
					<GoogleStreetViewMap coordinate={locationCoordinate}></GoogleStreetViewMap>
				)}
				<GoogleMapWindow
					defaultMapCoordinate={defaultMapCoordinate}
					selectedCoordinate={selectedCoordinate}
					setSelectedCoordinate={setSelectedCoordinate}
					locationCoordinate={locationCoordinate}
				></GoogleMapWindow>
			</div>
		</>
	);
};

export default ExampleGameThing;
