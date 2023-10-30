import { useMemo, useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, MarkerF, PolylineF } from "@react-google-maps/api";
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
interface Props {
	setSelectedCoordinate: Function;
	defaultMapCoordinate: LatLngLiteral;
	selectedCoordinate: LatLngLiteral | null;
	locationCoordinate: LatLngLiteral;
}

const Map: React.FC<Props> = ({
	setSelectedCoordinate,
	defaultMapCoordinate,
	selectedCoordinate,
	locationCoordinate,
}) => {
	const mapRef = useRef<GoogleMap>();
	//Tate Center at 33.951752641469085, -83.37435458710178
	const center = useMemo<LatLngLiteral>(() => ({ lat: defaultMapCoordinate.lat, lng: defaultMapCoordinate.lng }), []);
	const onLoadF = (marker: any) => {
		console.log("marker: ", marker);
	};

	const [clicked, setClicked] = useState(false);

	const options = useMemo<MapOptions>(
		() => ({
			mapId: "b181cac70f27f5e6",
			disableDefaultUI: true,
			clickableIcons: false,
		}),
		[],
	);

	const [pathCoordinates, setPathCoordinates] = useState<LatLngLiteral[] | null>(null);

	const onLoad = useCallback((map: any) => (mapRef.current = map), []);
	if (!window.google) return <div></div>;

	return (
		<div className="w-[50%]">
			<div className="w-full flex flex-col h-screen bg-grey-500">
				<GoogleMap
					zoom={16}
					center={center}
					mapContainerClassName=" w-full h-full"
					options={options}
					onLoad={onLoad}
					onClick={(event) => {
						setClicked(true);
						// console.log(event);
						const newcoordinate = {
							lat: event.latLng?.lat(),
							lng: event.latLng?.lng(),
						} as LatLngLiteral;
						setSelectedCoordinate(newcoordinate);
						setPathCoordinates([locationCoordinate, newcoordinate]);
					}}
				>
					{selectedCoordinate && <MarkerF onLoad={onLoadF} position={selectedCoordinate} />}
					{locationCoordinate && clicked && <MarkerF onLoad={onLoadF} position={locationCoordinate} />}
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

export default Map;
