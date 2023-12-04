import React, { useMemo, useState } from "react";
import GoogleStreetView from "./GoogleStreetView";
import { ReloadOutlined } from "@ant-design/icons";
import { difficultyType } from "../../../pages/GamePage";
type LatLngLiteral = google.maps.LatLngLiteral;
interface Props {
	coordinate: LatLngLiteral;
	setHeading: Function;
	difficulty: difficultyType | null;
}

type povType = {
	heading: number;
	pitch: number;
};

/**
 *
 * @param setHeading: A stateful set function that updates with the current heading the street view camera is facing
 * @param coordinate: The coordinate (answer location) that the street view should display
 * @returns A google street view of the coordinate
 */
const GoogleStreetViewWindow: React.FC<Props> = ({ coordinate, setHeading, difficulty }) => {
	const center = {
		lat: coordinate.lat,
		lng: coordinate.lng,
	};
	const [rerenderStreetView, setRerenderStreetview] = useState(0);

	const pov = { heading: 0, pitch: 0 } as povType;

	const streetViewPanoramaOptions = {
		position: center,
		pov: pov,
		zoom: 0,
		addressControl: false,
		showRoadLabels: false,
		zoomControl: false,
		motionTrackingControl: false,
		scrollwheel: difficulty ? difficulty.zoom : true,
		fullscreenControl: false,
		disableDoubleCLickZoom: true,
		panControl: false,
		enableCloseButton: false,

		clickToGo: difficulty ? difficulty.movement : true,
		linksControl: difficulty ? difficulty.movement : true,
	};

	// We dont want the street view to rerender whenever we update our POV for our compass. Add any dependencies that it actually does need to the second param of use memo.
	const street = useMemo(() => {
		return (
			<div className="w-screen relative">
				<ReloadOutlined
					className=" z-50 bottom-[2px] right-[310px] absolute  text-white hover:text-red-500"
					onClick={() => {
						setRerenderStreetview((x) => x + 1);
					}}
				>
					Reset position
				</ReloadOutlined>
				<GoogleStreetView
					apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
					streetViewPanoramaOptions={streetViewPanoramaOptions}
					onPovChanged={(x: povType) => {
						setHeading(x.heading);
					}}
				></GoogleStreetView>
			</div>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coordinate, rerenderStreetView]);

	return { ...street };
};

export default GoogleStreetViewWindow;
