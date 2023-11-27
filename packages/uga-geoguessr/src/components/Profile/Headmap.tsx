import { HeatMapOutlined } from "@ant-design/icons";
import { GoogleMap, HeatmapLayer, HeatmapLayerF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { LatLng } from "use-places-autocomplete";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface Props {
	pastGameData:
		| [
				{
					gameTypeTitle: String;
					gameTypeId: String;
					stages: [
						{
							distance: number;
							percentage: number;
							score: number;
							selectedLocation: {
								lat: number;
								lng: number;
							};
							answerLocation: {
								lat: number;
								lng: number;
							};
						},
					];
				},
		  ];
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
const Heatmap: React.FC<Props> = ({ pastGameData }) => {
	const mapRef = useRef<GoogleMap>();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const center = useMemo<LatLngLiteral>(() => ({ lat: 33.951752641469085, lng: -83.37435458710178 }), []);

	const options = useMemo<MapOptions>(
		() => ({
			mapId: "b181cac70f27f5e6",
			disableDefaultUI: true,
			clickableIcons: false,
		}),
		[],
	);
	// const data = useMemo(() => {
	// 	const temp: google.maps.visualization.WeightedLocation[] = [];
	// 	pastGameData?.map((pastGame, index) => {
	// 		pastGame.stages.map((game, i) => {
	// 			let weight;
	// 			const score = game.score;
	// 			if (score < 100) weight = 0.5;
	// 			switch (true) {
	// 				case score >= 500:
	// 					weight = 50;
	// 					break;

	// 				case score >= 250 && score < 500:
	// 					weight = 5;
	// 					break;
	// 				case score >= 100 && score < 250:
	// 					weight = 3;
	// 					break;
	// 				case score >= 50 && score < 100:
	// 					weight = 1;
	// 					break;
	// 				default:
	// 					weight = 0.5;
	// 					break;
	// 			}

	// 			temp.push({
	// 				location: new google.maps.LatLng(game.answerLocation.lat, game.answerLocation.lng),
	// 				weight: 5000 - game.score,
	// 			});
	// 		});
	// 	});
	// 	return temp;
	// }, [pastGameData]);
	const tempHeatMapData: google.maps.visualization.WeightedLocation[] = [];
	pastGameData.map((pastGame, index) => {
		pastGame.stages.map((game, i) => {
			let weight;
			const distance = game.distance;
			switch (true) {
				case distance >= 500:
					weight = 5;
					break;

				case distance >= 250 && distance < 500:
					weight = 0.5;
					break;
				case distance >= 100 && distance < 250:
					weight = 0.2;
					break;
				case distance >= 50 && distance < 100:
					weight = 0.15;
					break;
				default:
					weight = 0.1;
					break;
			}

			tempHeatMapData.push({
				location: new google.maps.LatLng(game.answerLocation.lat, game.answerLocation.lng),
				weight: weight,
			});
		});
	});
	const [heatMapData, setHeatMapData] = useState(tempHeatMapData);

	const onLoad = useCallback((map: any) => {
		mapRef.current = map;
		const reset: google.maps.visualization.WeightedLocation[] = [];
		setHeatMapData(reset);
		setHeatMapData(tempHeatMapData);
	}, []);
	if (!window.google) return <div></div>;

	return (
		<div className="w-full h-full">
			<div className="w-full flex flex-col h-full bg-grey-500">
				<GoogleMap
					zoom={13}
					center={center}
					mapContainerClassName=" w-full h-full"
					options={options}
					onLoad={onLoad}
					onClick={(event) => {}}
				>
					<HeatmapLayerF data={heatMapData}></HeatmapLayerF>
				</GoogleMap>
			</div>
		</div>
	);
};

export default Heatmap;
