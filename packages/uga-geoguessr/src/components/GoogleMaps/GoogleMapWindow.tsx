import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
import { Coordinate } from "../../pages/ExampleGame";
interface Props {
	setCoordinate: Function;
	coordinate: Coordinate;
}
const GoogleMapWindow: React.FC<Props> = ({ setCoordinate, coordinate }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});
	if (!isLoaded) return <div>...</div>;
	if (loadError) return <div>Error</div>;
	return <Map coordinate={coordinate} setCoordinate={setCoordinate}></Map>;
};
export default GoogleMapWindow;
