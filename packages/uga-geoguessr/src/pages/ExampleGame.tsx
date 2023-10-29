import { useState } from "react";
import GoogleMapWindow from "../components/GoogleMaps/GoogleMapWindow";
import StreetView from "../components/StreetView/StreetView";

export type Coordinate = {
	x: number;
	y: number;
};

function ExampleGame() {
	const [coordinate, setCoordinate] = useState<Coordinate>({ x: 0, y: 0 });

	const image =
		'https://cdn.discordapp.com/attachments/1054239396024549486/1164765489390682112/timothy-oldfield-luufnHoChRU-unsplash.jpg?ex=65446764&is=6531f264&hm=8c226b2d915319c6bf408d77d6813dfde8b5d0c0feadec863bf68e01ec314a1f&"';

	return (
		<>
			<p className="text-green-500">Random 360 image i got off google.</p>
			<img alt="street-view" src={image} width={300}></img>
			<div>{`Current X: ${coordinate ? coordinate.x : 0}`}</div>
			<div>{`Current Y: ${coordinate ? coordinate.y : 0}`}</div>
			<div className="flex ">
				<StreetView image={image}></StreetView>
				<GoogleMapWindow setCoordinate={setCoordinate}></GoogleMapWindow>
			</div>
		</>
	);
}

export default ExampleGame;
