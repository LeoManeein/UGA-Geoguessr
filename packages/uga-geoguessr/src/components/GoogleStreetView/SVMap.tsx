// @ts-ignore
import Streetview from "react-google-streetview";
import React from "react";
import { Coordinate } from "../../pages/ExampleGame";
interface Props {
	coordinate: Coordinate;
}

const GoogleStreetViewMap: React.FC<Props> = ({ coordinate }) => {
	const center = {
		lat: coordinate.x,
		lng: coordinate.y,
	};
	const streetViewPanoramaOptions = {
		position: center,
		pov: { heading: 100, pitch: 0 },
		zoom: 1,
		addressControl: false,
		showRoadLabels: false,
		zoomControl: false,
	};

	return (
		<div className="w-[400px] w-[800px]">
			{/* @ts-ignore */}
			{/* <GoogleMap mapContainerStyle={containerStyle} visible={false} center={center} zoom={10}> */}
			{/* <StreetViewPanorama options={options} id="street-view" position={center} visible={true} /> */}
			<Streetview
				apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
				streetViewPanoramaOptions={streetViewPanoramaOptions}
			></Streetview>
			{/* </GoogleMap> */}
		</div>
	);
};

export default GoogleStreetViewMap;
