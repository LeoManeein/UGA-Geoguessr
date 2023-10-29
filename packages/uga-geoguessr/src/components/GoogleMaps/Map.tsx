import { useMemo, useCallback, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Coordinate } from "../../pages/ExampleGame";
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
interface Props {
	setCoordinate: Function;
}

const Map: React.FC<Props> = ({ setCoordinate }) => {
	const mapRef = useRef<GoogleMap>();
	//Tate Center at 33.951752641469085, -83.37435458710178
	const center = useMemo<LatLngLiteral>(() => ({ lat: 33.951752641469085, lng: -83.37435458710178 }), []);
	const options = useMemo<MapOptions>(
		() => ({
			mapId: "b181cac70f27f5e6",
			disableDefaultUI: true,
			clickableIcons: false,
		}),
		[],
	);
	const onLoad = useCallback((map: any) => (mapRef.current = map), []);

	return (
		<div className="w-[50%]">
			<div className="w-full flex h-screen bg-grey-500">
				<GoogleMap
					zoom={16}
					center={center}
					mapContainerClassName=" w-full h-full"
					options={options}
					onLoad={onLoad}
					onClick={(event) => {
						console.log(event);
						const coordinate = {
							x: event.latLng?.lat(),
							y: event.latLng?.lng(),
						} as Coordinate;
						setCoordinate(coordinate);
					}}
				></GoogleMap>
			</div>
		</div>
	);
};

// const defaultOptions = {
// 	strokeOpacity: 0.5,
// 	strokeWeight: 2,
// 	clickable: false,
// 	draggable: false,
// 	editable: false,
// 	visible: true,
// };

export default Map;
