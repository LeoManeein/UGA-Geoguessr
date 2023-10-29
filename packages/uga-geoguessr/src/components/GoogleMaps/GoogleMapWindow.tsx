import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
type LatLngLiteral = google.maps.LatLngLiteral;
interface Props {
	setCoordinate: Function;
	coordinate: LatLngLiteral;
	selectedCoordinate: LatLngLiteral | null;
	locationCoordinate: LatLngLiteral;
}

const GoogleMapWindow: React.FC<Props> = ({ setCoordinate, coordinate, selectedCoordinate, locationCoordinate }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
		// libraries: ["drawing", "geometry", "places", "visualization"],
	});
	if (!window.google) return <div></div>;

	if (!isLoaded) return <div>...</div>;
	if (loadError) return <div>Error</div>;
	return (
		<Map
			coordinate={coordinate}
			selectedCoordinate={selectedCoordinate}
			setCoordinate={setCoordinate}
			locationCoordinate={locationCoordinate}
		></Map>
	);
};
export default GoogleMapWindow;
