import React, { useState, useEffect } from "react";
import ExampleGameThing from "../components/ExampleGame/ExampleGameThing";

type LatLngLiteral = google.maps.LatLngLiteral;

// TODO - Currently every thing here is on the client. We need to move a lot of this over to the backend. Theoretically we dont want the client to ever interact with the correct locations coordinates.

function ExampleGame() {
	const [correctAnswerLocation, setCorrectAnswerLocation] = useState<LatLngLiteral | null>(null);

	// We have an array of coordinates. We choose one at random, and then choose a random point within a radius of that point. Then we talk to the google maps api to get the closest coordinate with a google street view.
	const possibleCoordinatesForRandomLocationInRadius = [
		{ lat: 33.951752641469085, lng: -83.37435458710178 }, // center of UGA
		{ lat: 33.90579530605762, lng: -83.38012569492567 }, // Botanical garden
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
		return <div>Loading... or error lol</div>;
	}

	return <ExampleGameThing answerLocation={correctAnswerLocation}></ExampleGameThing>;
}

export default ExampleGame;
