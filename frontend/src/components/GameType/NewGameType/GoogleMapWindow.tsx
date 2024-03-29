import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useMemo, useRef } from "react";
import { PossibleLocation } from "./NewGameType";
import GoogleMapLocationCircle from "./GoogleMapLocationCircle";
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface Props {
	setSelectedCoordinates: Function;
	defaultMapCoordinate: LatLngLiteral;
	locations: PossibleLocation[] | null;
	deleteCoordinate: Function;
	setLocations: Function;
}
/**
 *
 * @param setSelectedCoordinates: A function that can be used to call the OnMapSubmit function
 * @param defaultMapCoordinate: A latlng coordinate that the google maps will center upon
 * @param locations: Current list of all the locations selected
 * @param deleteCoordinate: Function that takes a lat lng object and finds and removes any similar ones in locations.
 * @param setLocations: helper function that sets the current list of locations
 * @returns
 */
const GoogleMapWindow: React.FC<Props> = ({
	setSelectedCoordinates,
	defaultMapCoordinate,
	locations,
	deleteCoordinate,
	setLocations,
}) => {
	const mapRef = useRef<GoogleMap>();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const center = useMemo<LatLngLiteral>(() => ({ lat: defaultMapCoordinate.lat, lng: defaultMapCoordinate.lng }), []);

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
						const newcoordinate = {
							lat: event.latLng?.lat(),
							lng: event.latLng?.lng(),
							radius: 250,
						} as PossibleLocation;
						setSelectedCoordinates(newcoordinate);
					}}
				>
					{locations &&
						locations.map((current) => {
							return (
								<GoogleMapLocationCircle
									key={Math.random()}
									current={current}
									deleteCoordinate={deleteCoordinate}
									updateRadius={(newRadius: number) => {
										// jank way of finding the one element that needs to have its radius updated
										let index = 0;
										locations.forEach((x, i) => {
											if (x.lat === current.lat && x.lng === current.lng) {
												index = i;
											}
										});
										let copyData = locations;
										copyData[index].radius = newRadius;
										setLocations((oldArray: PossibleLocation[]) => {
											return [
												...oldArray.slice(0, index),
												copyData[index],
												...oldArray.slice(index + 1),
											];
										});
									}}
									updateLocation={(lat: number, lng: number) => {
										// jank way of finding the one element that needs to have its radius updated
										let index = 0;
										locations.forEach((x, i) => {
											if (x.lat === current.lat && x.lng === current.lng) {
												index = i;
											}
										});
										let copyData = locations;
										copyData[index].lat = lat;
										copyData[index].lng = lng;
										setLocations((oldArray: PossibleLocation[]) => {
											return [
												...oldArray.slice(0, index),
												copyData[index],
												...oldArray.slice(index + 1),
											];
										});
									}}
								></GoogleMapLocationCircle>
							);
						})}
				</GoogleMap>
				{/* <div
					onClick={() => {
						if (!selectedCoordinate) return;
					}}
					className={`  w-full  h-[50px] z-50  text-center pt-[4px] mt-1 ${styles.button} `}
				>
					SUBMIT
				</div> */}
			</div>
		</div>
	);
};

export default GoogleMapWindow;
