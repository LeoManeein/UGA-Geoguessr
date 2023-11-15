import { useState, useEffect } from "react";
import ExampleGameThing from "../components/ExampleGame/ExampleGameThing";
import RootLayout from "./Root";
import MoonLoader from "react-spinners/MoonLoader";

type LatLngLiteral = google.maps.LatLngLiteral;

/**
 *
 * @returns DEPRECATED. Do not use unless as a reference for a game.
 */
function ExampleGame() {
	const [correctAnswerLocation, setCorrectAnswerLocation] = useState<LatLngLiteral | null>(null);

	// We have an array of coordinates. We choose one at random, and then choose a random point within a radius of that point. Then we talk to the google maps api to get the closest coordinate with a google street view.
	const possibleCoordinatesForRandomLocationInRadius = [
		{ lat: 33.951752641469085, lng: -83.37435458710178 }, // center of UGA
		// { lat: 33.90579530605762, lng: -83.38012569492567 }, // Botanical garden
		{ lat: 33.93779744228126, lng: -83.37035720676589 }, // East campus deck
		{ lat: 33.94455216445822, lng: -83.3764000052442 }, // snelling
		{ lat: 33.94280498526238, lng: -83.37570987515674 }, // science learning center
		{ lat: 33.94618053471555, lng: -83.3748458911655 }, // boyd
		{ lat: 33.93307374280034, lng: -83.37205409908691 }, // IM deck
		{ lat: 33.95632694243535, lng: -83.37491677838388 }, // arch
		// { lat: 33.938902575668195, lng: -83.37555781882209 }, // drfitmier
		{ lat: 33.94329955664541, lng: -83.37826148556036 }, // coliseum
	];

	// Given a lat and lng, it will choose a random point in a circle of those coordinsates
	function randomPointinRadius(lat: number, lng: number, radius: number) {
		const angle = Math.random() * 2 * Math.PI;
		const distance = Math.random() * radius;
		const x = lat + distance * Math.cos(angle);
		const y = lng + distance * Math.sin(angle);
		return { lat: x, lng: y } as LatLngLiteral;
	}

	// Helper function to choose a random starting location from the possible options (before picking a point in the radius)
	const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
	// Choosing a random location for a starting point
	const randomCoordinateForRadius = getRandomElement(possibleCoordinatesForRandomLocationInRadius);
	// Picking a random point from the radius of the random coordinate we just picked
	const randomPoint = randomPointinRadius(randomCoordinateForRadius.lat, randomCoordinateForRadius.lng, 0.005);

	// Temp/jank way to get the closest street view location
	useEffect(() => {
		const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
		const location = `${randomPoint.lat},${randomPoint.lng}`;
		const size = "600x300";
		const radius = "1234";

		fetch(
			`https://maps.googleapis.com/maps/api/streetview/metadata?size=${size}&location=${location}&radius=${radius}&key=${apiKey}`,
		)
			.then((response) => response.json())
			.then((data: any) => {
				setCorrectAnswerLocation(data.location);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	if (!correctAnswerLocation) {
		return (
			<RootLayout>
				<div className="flex items-center justify-center h-screen">
					<MoonLoader></MoonLoader>
				</div>
			</RootLayout>
		);
	}
	return <ExampleGameThing answerLocation={correctAnswerLocation}></ExampleGameThing>;
}

export default ExampleGame;
