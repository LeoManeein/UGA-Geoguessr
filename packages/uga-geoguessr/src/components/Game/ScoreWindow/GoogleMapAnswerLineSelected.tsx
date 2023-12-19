import { MarkerF, PolylineF } from "@react-google-maps/api";
type LatLngLiteral = google.maps.LatLngLiteral;
interface Props {
	data: {
		score: number;
		percentage: number;
		distance: number;
		selectedLocation: LatLngLiteral;
		answerLocation: LatLngLiteral;
	};
}

const GoogleMapAnswerLineSelected: React.FC<Props> = ({ data }) => {
	const onLoadF = (marker: any) => {};

	const pathCoordinates = [data.selectedLocation, data.answerLocation];

	return (
		<>
			<MarkerF onLoad={onLoadF} position={data.selectedLocation} />

			<MarkerF
				icon={{
					url: "https://cdn.discordapp.com/attachments/1054239396024549486/1179668165718966302/cadadafc025b1fbe2e82fc8e3a8df884.png?ex=657a9e97&is=65682997&hm=9993ff31357619fd6f979be6b9a4e96597f01572f109a988687d65bce27cee44&",
					anchor: new google.maps.Point(15, 40),
					scaledSize: new google.maps.Size(30, 40),
				}}
				position={data.answerLocation}
			/>

			<PolylineF
				path={pathCoordinates}
				options={{
					strokeColor: "#ff2527",
					strokeOpacity: 0.75,
					strokeWeight: 2,
				}}
			/>
		</>
	);
};

export default GoogleMapAnswerLineSelected;
