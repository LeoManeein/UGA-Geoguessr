import React, { useState } from "react";
import GoogleMapWindow from "./MapLocationSelector"; // Import the Google Maps component
type LatLngLiteral = google.maps.LatLngLiteral;
// import "./NewGame.css"; // Assuming you update the CSS file name accordingly

interface NewGameProps {
	onAddGame: (game: {
		id: string;
		gameName: string;
		description: string;
		imageURL: string;
		locations: { lat: number; lng: number }[];
	}) => void;
}

const NewGame: React.FC<NewGameProps> = (props) => {
	const [gameName, setGameName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [imageURL, setImageURL] = useState<string>("");
	const [locations, setLocations] = useState<{ lat: number; lng: number }[]>([]);
	const [showMap, setShowMap] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	// The location that is selected on the map when the user clicks on it
	const [selectedCoordinate, setSelectedCoordinate] = useState<LatLngLiteral | null>(null);

	const onMapSubmit = (selectedCoordinate: { lat: number; lng: number } | null) => {
		if (selectedCoordinate) {
			setLocations([...locations, selectedCoordinate]);
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

				{showMap && (
					// Google Map component for selecting locations

					<div
						className={`absolute bottom-6 right-2  w-[300px]  h-[250px] z-10  transition-transform md:hover:w-[700px] md:hover:h-[400px] `}
					>
						<GoogleMapWindow
							defaultMapCoordinate={defaultMapCoordinate}
							selectedCoordinate={selectedCoordinate}
							setSelectedCoordinate={setSelectedCoordinate}
						></GoogleMapWindow>
					</div>
				)}

				{error && <div style={{ color: "red" }}>{error}</div>}

				<button type="submit">Add Game</button>
			</form>
		</div>
	);
};

export default NewGame;
