import { CircleF, MarkerF } from "@react-google-maps/api";
import { PossibleLocation } from "./NewGame";
import { useState } from "react";

interface Props {
	current: PossibleLocation;
	deleteCoordinate: Function;
	updateRadius: Function;
}

const GoogleMapLocationCircle: React.FC<Props> = ({ current, deleteCoordinate, updateRadius }) => {
	const [offsetLocation, setOffsetLocation] = useState(
		google.maps.geometry.spherical.computeOffset(current, current.radius, 90),
	);
	const circleOptions = {
		strokeColor: "#ff0000",
		fillColor: "#dcfc26",
		fillOpacity: 0.2,
		strokeWeight: 2,
		clickable: false,
		editable: false,
		draggable: false,
		zIndex: 1,
	};

	if (!window.google) return <div></div>;

	return (
		<>
			<MarkerF
				onClick={() => {
					deleteCoordinate(current);
				}}
				key={Math.random()}
				position={current}
				draggable={false}
				onDragEnd={(e: any) => {
					console.log(e.latLng.lat());
				}}
			/>

			<CircleF center={current} radius={current.radius} options={circleOptions} />
			<MarkerF
				icon={{
					url: "https://cdn.discordapp.com/attachments/1054239396024549486/1173784441378844682/pixil-frame-01.png?ex=656536f2&is=6552c1f2&hm=d98f47a61c0c7bb37c532b61365fbe7249b17c569a8c99f9debbbb1795a6f490&",
					anchor: new google.maps.Point(0, 10),
					scaledSize: new google.maps.Size(16, 16),
				}}
				key={Math.random()}
				position={offsetLocation}
				draggable={true}
				onDragEnd={(e: any) => {
					let newRadius = google.maps.geometry.spherical.computeDistanceBetween(current, {
						lat: e.latLng.lat(),
						lng: e.latLng.lng(),
					});
					newRadius = newRadius > 2500 ? 2500 : newRadius;
					updateRadius(newRadius);
				}}
			/>
		</>
	);
};

export default GoogleMapLocationCircle;
