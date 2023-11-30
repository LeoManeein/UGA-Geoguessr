import { useCallback, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import GoogleMapAnswerLineSelected from "./GoogleMapAnswerLineSelected";
type LatLngLiteral = google.maps.LatLngLiteral;
interface Props {
	data: {
		score: number;
		percentage: number;
		distance: number;
		selectedLocation: LatLngLiteral;
		answerLocation: LatLngLiteral;
	}[];
}

const ResultsGoogleMapWindow: React.FC<Props> = ({ data }) => {
	const mapRef = useRef<GoogleMap>();

	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	const options = {
		mapId: "b181cac70f27f5e6",
		disableDefaultUI: true,
		clickableIcons: false,
	};

	const onLoad = useCallback((map: any) => (mapRef.current = map), []);
	if (!window.google) return <div></div>;

	return (
		<div className="w-full h-full">
			<div className="w-full flex flex-col h-full bg-grey-500">
				<GoogleMap
					zoom={14}
					center={defaultMapCoordinate}
					mapContainerClassName=" w-full h-full"
					options={options}
					onLoad={onLoad}
				>
					{data.map((current) => {
						return (
							<GoogleMapAnswerLineSelected
								key={Math.random() + "ans"}
								data={current}
							></GoogleMapAnswerLineSelected>
						);
					})}
				</GoogleMap>
			</div>
		</div>
	);
};

export default ResultsGoogleMapWindow;
