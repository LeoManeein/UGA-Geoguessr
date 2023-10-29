import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
interface Props {
	setCoordinate: Function;
}
const GoogleMapWindow: React.FC<Props> = ({ setCoordinate }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});

	if (!isLoaded) return <div>...</div>;
	if (loadError) return <div>Error</div>;
	return <Map setCoordinate={setCoordinate}></Map>;
};
export default GoogleMapWindow;
