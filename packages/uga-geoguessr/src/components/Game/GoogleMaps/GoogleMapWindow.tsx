import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef } from "react";
import styles from "../../../Globals.module.css";
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
interface Props {
	setSelectedCoordinate: Function;
	defaultMapCoordinate: LatLngLiteral;
	selectedCoordinate: LatLngLiteral | null;
	setShowScoreWindow: Function;
}

/**
 *
 * @param setSelectedCoordinate: Function that sets the currently selected coordinate when a position is clicked on the google map
 * @param defaultMapCoordinate: The default center point of the google map. probably should be the center of UGA campus
 * @param selectedCoordinate: The currently selected latlng point on the google map.
 * @param setShowScoreWindow: When submit is clicked this function will make the score window display
 * @returns A google map window the user can click to select points, and a button to submit the selected point
 */
const GoogleMapWindow: React.FC<Props> = ({
	setSelectedCoordinate,
	defaultMapCoordinate,
	selectedCoordinate,
	setShowScoreWindow,
}) => {
	const mapRef = useRef<GoogleMap>();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const center = useMemo<LatLngLiteral>(() => ({ lat: defaultMapCoordinate.lat, lng: defaultMapCoordinate.lng }), []);
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
