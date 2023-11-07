import React, { useEffect, useMemo } from "react";
import GoogleStreetView from "./GoogleStreetView";
type LatLngLiteral = google.maps.LatLngLiteral;
interface Props {
	coordinate: LatLngLiteral;
	setHeading: Function;
}

type povType = {
	heading: number;
	pitch: number;
};

const GoogleStreetViewWindow: React.FC<Props> = ({ coordinate, setHeading }) => {
	const center = {
		lat: coordinate.lat,
		lng: coordinate.lng,
	};

	const pov = { heading: 0, pitch: 0 } as povType;

	const streetViewPanoramaOptions = {
		position: center,
		pov: pov,
		zoom: 0,
		addressControl: false,
		showRoadLabels: false,
		zoomControl: false,
		// linkControl: false,
		scrollwheel: true,
		fullscreenControl: false,
		// disableDoubleCLickZoom: true,
		panControl: false,
		// linksControl: false,
		// enableCloseButton: false,
		// clickToGo: false,
	};

	// We dont want the street view to rerender whenever we update our POV for our compass. Add any dependencies that it actually does need to the second param of use memo.
	const street = useMemo(() => {
		return (
			<div className="w-screen ">
				<GoogleStreetView
					apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
					streetViewPanoramaOptions={streetViewPanoramaOptions}
					onPovChanged={(x: povType) => {
						setHeading(x.heading);
					}}
				></GoogleStreetView>
			</div>
		);
	}, [coordinate]);

	useEffect(() => {
		console.log("should reload");
	}, [coordinate]);

	return { ...street };
};

export default GoogleStreetViewWindow;
