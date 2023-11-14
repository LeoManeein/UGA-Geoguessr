import { GoogleMap, MarkerF, PolylineF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import styles from "../../Globals.module.css";
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface Props {
	setSelectedCoordinate: Function;
	defaultMapCenter: LatLngLiteral;
	selectedCoordinate: LatLngLiteral | null;
	locationCoordinate: LatLngLiteral;
	setShowScoreWindow: Function;
}

const GoogleMapWindow: React.FC<Props> = ({
	setSelectedCoordinate,
	defaultMapCenter,
	selectedCoordinate,
	locationCoordinate,
	setShowScoreWindow,
}) => {
	const mapRef = useRef<GoogleMap>();
	//Tate Center at 33.951752641469085, -83.37435458710178
	const center = useMemo<LatLngLiteral>(() => ({ lat: defaultMapCenter.lat, lng: defaultMapCenter.lng }), []);
	const onLoadF = (marker: any) => {
		console.log("marker: ", marker);
	};

	const options = useMemo<MapOptions>(
		() => ({
			mapId: "b181cac70f27f5e6",
			disableDefaultUI: true,
			clickableIcons: false,
		}),
		[],
	);

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
					onClick={(event) => {
						// console.log(event);
						const newcoordinate = {
							lat: event.latLng?.lat(),
							lng: event.latLng?.lng(),
						} as LatLngLiteral;
						setSelectedCoordinate(newcoordinate);
					}}
				>
					{selectedCoordinate && <MarkerF onLoad={onLoadF} position={selectedCoordinate} />}
				</GoogleMap>
				<div
					onClick={() => {
						if (!selectedCoordinate) return;
						setShowScoreWindow(true);
					}}
					className={`  w-full  h-[50px] z-50  text-center pt-[4px] mt-1 ${styles.button} `}
				>
					SUBMIT
				</div>
			</div>
		</div>
	);
};

export default GoogleMapWindow;
