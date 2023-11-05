import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import GoogleStreetViewWindow from "./GoogleMaps/GoogleStreetViewWindow";
import GoogleMapWindow from "./GoogleMaps/GoogleMapWindow";
import Header from "../Header/Header";
import LoadingSpinner from "../LoadingSpinner";
import Compass from "./GoogleMaps/Compass";
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

	const [heading, setHeading] = useState(0);

	if (!isLoaded) return <LoadingSpinner></LoadingSpinner>;
	if (loadError) return <div>Error</div>;

	return (
		<div className="h-screen relative overflow-x-hidden overflow-y-hidden">
			<div className="absolute top-0 z-20 w-screen">
				<Header></Header>
			</div>

			<div className="flex w-full h-screen relative">
				<GoogleStreetViewWindow setHeading={setHeading} coordinate={locationCoordinate}></GoogleStreetViewWindow>
				<div
					className={`absolute bottom-6 right-4 bg-red-200 w-[300px]  h-[250px] z-10  transition-transform hover:w-[700px] hover:h-[400px] `}
				>
					<GoogleMapWindow
						defaultMapCoordinate={defaultMapCoordinate}
						selectedCoordinate={selectedCoordinate}
						setSelectedCoordinate={setSelectedCoordinate}
						locationCoordinate={locationCoordinate}
					></GoogleMapWindow>
				</div>
				<div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 p-4 z-30`}>
					<Compass heading={heading}></Compass>
				</div>
			</div>
		</div>
	);
};

export default ExampleGameThing;
