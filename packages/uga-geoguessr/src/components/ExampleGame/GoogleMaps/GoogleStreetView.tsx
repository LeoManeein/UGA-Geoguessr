// @ts-ignore
import Streetview from "react-google-streetview";
import React from "react";
type LatLngLiteral = google.maps.LatLngLiteral;
interface Props {
	coordinate: LatLngLiteral;
}

const GoogleStreetView: React.FC<Props> = ({ coordinate }) => {
	const center = {
		lat: coordinate.lat,
		lng: coordinate.lng,
	};
	const streetViewPanoramaOptions = {
		position: center,
		pov: { heading: 100, pitch: 0 },
		zoom: 0.5,
		addressControl: false,
		showRoadLabels: false,
		zoomControl: false,
		// linkControl: false,
		scrollwheel: true,
		fullscreenControl: false,
		// disableDoubleCLickZoom: true,
		// panControl: false,
		// linksControl: false,
		// enableCloseButton: false,
		// clickToGo: false,
	};

	return (
		<div className="w-screen ">
			<Streetview
				apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
				streetViewPanoramaOptions={streetViewPanoramaOptions}
			></Streetview>
		</div>
	);
};

export default GoogleStreetView;
