import { CircleF, MarkerF } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { PossibleLocation } from "./NewGameType";
type LatLngLiteral = google.maps.LatLngLiteral;
interface Props {
	current: PossibleLocation;
	deleteCoordinate: Function;
	updateRadius: Function;
	updateLocation: Function;
}
/**
 *
 * @param current:  the location that the marker will be placed upon
 * @param deleteCoordinate: helper function to remove the current location from the list when the marker is clicked
 * @param updateRadius: updates the current locations radius
 * @param updateLocation: updates the current locations lat and lng
 * @returns A marker and circle that represents a location and its radius
 */
const GoogleMapLocationCircle: React.FC<Props> = ({ current, deleteCoordinate, updateRadius, updateLocation }) => {
	// temp location that is displayed when dragging the main marker
	const [tempLocation, setTempLocation] = useState<null | LatLngLiteral>(null);
	// temp radius for the circle as we drag the resize marker
	const [tempRadius, setTempRadius] = useState<null | number>(null);

	const circleOptions = {
		strokeColor: "#B41512",
		fillColor: tempLocation ? "#943E3E" : "#dcfc26",
		fillOpacity: 0.2,
		strokeWeight: 6,
		clickable: false,
		editable: false,
		draggable: false,
		zIndex: 1,
	};
	// Using a lot of UseMemo because we want the circle to only rerender when we are dragging either the marker or resizer marker
	const MoveableCircle = useMemo(() => {
		return (
			<CircleF center={tempLocation || current} radius={tempRadius || current.radius} options={circleOptions} />
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tempLocation, tempRadius]);

	// Only want the button to move if we are currently dragging it
	const Resize = useMemo(() => {
		return (
			<>
				{!tempLocation && (
					<MarkerF
						icon={{
							url: "https://cdn.discordapp.com/attachments/1168655523646804080/1174472801793605672/Group_56.png?ex=6567b808&is=65554308&hm=480f0adda14b330ef4bfb4f15c757be948954495eb2fc4e4f0269cfb9f49ae70&",
							anchor: new google.maps.Point(14, 24),
							scaledSize: new google.maps.Size(28, 28),
						}}
						key={Math.random()}
						position={google.maps.geometry.spherical.computeOffset(current, current.radius, 90)}
						draggable={true}
						onDrag={(e: any) => {
							let newRadius = google.maps.geometry.spherical.computeDistanceBetween(current, {
								lat: e.latLng.lat(),
								lng: e.latLng.lng(),
							});
							setTempRadius(newRadius > 2500 ? 2500 : newRadius);
						}}
						onDragEnd={(e: any) => {
							let newRadius = google.maps.geometry.spherical.computeDistanceBetween(current, {
								lat: e.latLng.lat(),
								lng: e.latLng.lng(),
							});
							updateRadius(newRadius > 2500 ? 2500 : newRadius);
							setTempRadius(null);
						}}
					/>
				)}
			</>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tempLocation]);

	// Only rerenders when the location changes
	const Marker = useMemo(() => {
		return (
			<>
				<MarkerF
					onClick={() => {
						deleteCoordinate(current);
					}}
					key={Math.random()}
					position={current}
					draggable={true}
					onDragEnd={(e: any) => {
						setTempLocation(null);
						updateLocation(e.latLng.lat(), e.latLng.lng());
					}}
					onDrag={(e: any) => {
						setTempLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
					}}
				/>
			</>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current]);
	return (
		<>
			{Marker}
			{MoveableCircle}
			{Resize}
		</>
	);
};

export default GoogleMapLocationCircle;
