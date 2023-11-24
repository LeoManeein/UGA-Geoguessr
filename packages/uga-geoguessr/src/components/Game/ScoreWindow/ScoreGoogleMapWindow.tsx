import { useCallback, useRef } from "react";
import { GoogleMap, MarkerF, PolylineF } from "@react-google-maps/api";
type LatLngLiteral = google.maps.LatLngLiteral;
interface Props {
	defaultMapCoordinate: LatLngLiteral;
	selectedCoordinate: LatLngLiteral;
	locationCoordinate: LatLngLiteral;
}

const ScoreGoogleMapWindow: React.FC<Props> = ({ defaultMapCoordinate, selectedCoordinate, locationCoordinate }) => {
	const mapRef = useRef<GoogleMap>();
	const center = calculateMidpoint(
		selectedCoordinate.lat,
		selectedCoordinate.lng,
		locationCoordinate.lat,
		locationCoordinate.lng,
	);
	const onLoadF = (marker: any) => {
		console.log("marker: ", marker);
	};

	function calculateMidpoint(lat1: number, lng1: number, lat2: number, lng2: number) {
		// Convert latitude and longitude from degrees to radians
		lat1 = (Math.PI / 180) * lat1;
		lng1 = (Math.PI / 180) * lng1;
		lat2 = (Math.PI / 180) * lat2;
		lng2 = (Math.PI / 180) * lng2;

		// Calculate the average latitude and longitude
		let avgLat = (lat1 + lat2) / 2;
		let avgLng = (lng1 + lng2) / 2;

		// Convert the average latitude and longitude back to degrees
		avgLat = (avgLat * 180) / Math.PI;
		avgLng = (avgLng * 180) / Math.PI;

		return { lat: avgLat, lng: avgLng };
	}

	const options = {
		mapId: "b181cac70f27f5e6",
		disableDefaultUI: true,
		clickableIcons: false,
	};

	const pathCoordinates = [locationCoordinate, selectedCoordinate];

	const onLoad = useCallback((map: any) => (mapRef.current = map), []);
	if (!window.google) return <div></div>;

	return (
		<div className="w-full h-full">
			<div className="w-full flex flex-col h-full bg-grey-500">
				<GoogleMap
					zoom={14}
					center={center}
					mapContainerClassName=" w-full h-full"
					options={options}
					onLoad={onLoad}
				>
					{selectedCoordinate && <MarkerF onLoad={onLoadF} position={selectedCoordinate} />}
					{locationCoordinate && <MarkerF onLoad={onLoadF} position={locationCoordinate} />}
					{pathCoordinates && (
						<PolylineF
							path={pathCoordinates}
							options={{
								strokeColor: "#ff2527",
								strokeOpacity: 0.75,
								strokeWeight: 2,
							}}
						/>
					)}
				</GoogleMap>
			</div>
		</div>
	);
};

export default ScoreGoogleMapWindow;
