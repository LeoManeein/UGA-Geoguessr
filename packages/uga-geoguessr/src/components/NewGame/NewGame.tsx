import React, { useState } from "react";
import GoogleMapWindow from "./GoogleMapWindow"; // Import the Google Maps component
import { useLoadScript } from "@react-google-maps/api";
import LoadingSpinner from "../LoadingSpinner";
// import "./NewGame.css"; // Assuming you update the CSS file name accordingly
type LatLngLiteral = google.maps.LatLngLiteral;
interface NewGameProps {
	onAddGame: (game: {
		id: string;
		gameName: string;
		description: string;
		imageURL: string;
		locations: { latitude: number; longitude: number }[];
	}) => void;
}

const convertToLatLngLiteral = (coordinates: { lat: number; lng: number }): { latitude: number; longitude: number } => {
	return {
		latitude: coordinates.lat,
		longitude: coordinates.lng,
	};
};

const NewGame: React.FC<NewGameProps> = (props) => {
	const [gameName, setGameName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [imageURL, setImageURL] = useState<string>("");
	const [locations, setLocations] = useState<{ latitude: number; longitude: number }[]>([]);
	const [showMap, setShowMap] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// The default position that the google maps starts at
	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	// Makes sure the google map loads.
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	});

	const onMapSubmit = (selectedCoordinate: { lat: number; lng: number } | null) => {
		if (selectedCoordinate) {
			setLocations([...locations, convertToLatLngLiteral(selectedCoordinate)]);
		}
		setShowMap(false);
	};

	const validateForm = () => {
		if (!gameName || !description || !imageURL || locations.length === 0) {
			setError("Please fill out all fields before creating a new game.");
			return false;
		}
		setError(null);
		return true;
	};

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		const newGame = {
			id: Math.random().toString(),
			gameName: gameName,
			description: description,
			imageURL: imageURL,
			locations: locations,
		};

		props.onAddGame(newGame);

		setGameName("");
		setDescription("");
		setImageURL("");
		setLocations([]);
	};

	// Just to be safe if the google map doesnt load we return a loading spinner or an error message
	if (!isLoaded) return <LoadingSpinner></LoadingSpinner>;
	if (loadError) return <div>Error</div>;
	return (
		<div className="input">
			<form onSubmit={submitHandler}>
				<label>Game Name</label>
				<input id="gameName" type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} />
				<label>Description</label>
				<input
					id="description"
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label>Image URL</label>
				<input id="imageURL" type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

				{/* Button to show/hide the map */}
				<button type="button" onClick={() => setShowMap(!showMap)}>
					{showMap ? "Hide Map" : "Show Map"}
				</button>
				{/* I wrapped the google map window in a container that has its height and width specified. It doesnt have to be an exact value but it needs to be something otherwise itll be 0x0 */}
				{showMap && (
					<div className="   w-[300px]  h-[250px] z-10 ">
						<GoogleMapWindow
							setSelectedCoordinate={(selectedCoordinate: { lat: number; lng: number } | null) =>
								onMapSubmit(selectedCoordinate)
							}
							defaultMapCoordinate={defaultMapCoordinate}
							selectedCoordinate={null}
							locationCoordinate={{ lat: 0, lng: 0 }}
							setShowScoreWindow={(showScoreWindow: boolean) => setShowMap(showScoreWindow)}
						/>
					</div>
				)}

				{error && <div style={{ color: "red" }}>{error}</div>}

				<button type="submit">Add Game</button>
			</form>
		</div>
	);
};

export default NewGame;
