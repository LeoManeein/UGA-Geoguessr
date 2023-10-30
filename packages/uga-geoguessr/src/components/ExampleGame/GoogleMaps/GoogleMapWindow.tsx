import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
type LatLngLiteral = google.maps.LatLngLiteral;
interface Props {
	setSelectedCoordinate: Function;
	defaultMapCoordinate: LatLngLiteral;
	selectedCoordinate: LatLngLiteral | null;
	locationCoordinate: LatLngLiteral;
}

const GoogleMapWindow: React.FC<Props> = ({ setSelectedCoordinate, defaultMapCoordinate, selectedCoordinate, locationCoordinate }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
		// libraries: ["drawing", "geometry", "places", "visualization"],
	});
	if (!window.google) return <div></div>;

	if (!isLoaded) return <div>...</div>;
	if (loadError) return <div>Error</div>;
	return (
		<Map
		defaultMapCoordinate={defaultMapCoordinate}
			selectedCoordinate={selectedCoordinate}
			setSelectedCoordinate={setSelectedCoordinate}
			locationCoordinate={locationCoordinate}
		></Map>
	);
};
export default GoogleMapWindow;
