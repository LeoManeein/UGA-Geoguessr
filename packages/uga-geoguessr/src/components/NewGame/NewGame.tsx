import React, { useState } from "react";
import GoogleMapWindow from "./GoogleMapWindow"; // Import the Google Maps component
import { useLoadScript } from "@react-google-maps/api";
// import "./NewGame.css"; // Assuming you update the CSS file name accordingly
type LatLngLiteral = google.maps.LatLngLiteral;

export type PossibleLocation = {
	lat: number;
	lng: number;
	radius: number;
};
interface NewGameProps {
	onAddGame: (game: {
		id: string;
		title: string;
		description: string;
		url: string;
		possibleCoordinates: PossibleLocation[];
	}) => void;
}

const NewGame: React.FC<NewGameProps> = (props) => {
	const [gameName, setGameName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [imageURL, setImageURL] = useState<string>("");
	const [locations, setLocations] = useState<PossibleLocation[]>([]);
	const [showMap, setShowMap] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// The default position that the google maps starts at
	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	// Makes sure the google map loads.
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
		libraries: ["drawing", "geometry", "geometry", "places", "visualization"],
	});

	const onMapSubmit = (selectedCoordinate: { lat: number; lng: number; radius: number } | null) => {
		if (selectedCoordinate) {
			setLocations([...locations, selectedCoordinate]);
		}
		// Do we need to hide the map? Ideally the map stays open on the side of the screen so the user can mess around with it imo
		// setShowMap(false);
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
			title: gameName,
			description: description,
			url: imageURL,
			possibleCoordinates: locations,
		};

		props.onAddGame(newGame);

		setGameName("");
		setDescription("");
		setImageURL("");
		setLocations([]);
	};

	function deleteCoordinate(locationToDelete: LatLngLiteral) {
		setLocations((currentArray) => {
			return currentArray.filter((currentElement) => {
				return locationToDelete.lat !== currentElement.lat && locationToDelete.lng !== currentElement.lng;
			});
		});
	}
	return (
		<div className="flex m-auto justify-center  ">
			<div className="input w-1/2 sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px] ">
				<form onSubmit={submitHandler} className="flex flex-col mr-6">
					<label>Game Name</label>
					<input
						className="text-black"
						id="gameName"
						type="text"
						value={gameName}
						onChange={(e) => setGameName(e.target.value)}
					/>
					<label>Description</label>
					<input
						className="text-black"
						id="description"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<label>Image URL</label>
					<input
						className="text-black"
						id="imageURL"
						type="text"
						value={imageURL}
						onChange={(e) => setImageURL(e.target.value)}
					/>

					{/* Button to show/hide the map */}
					<button type="button" onClick={() => setShowMap(!showMap)}>
						{showMap ? "Hide Map" : "Show Map"}
					</button>

					{error && <div style={{ color: "red" }}>{error}</div>}

					<button type="submit">Add Game</button>
					<div>Temp way to see all the current locations</div>
					{locations.map((current) => {
						return (
							<div className="flex gap-x-2" key={Math.random()}>
								<div>lat: {current.lat},</div>
								<div>lng: {current.lng},</div>
								<div>radius (meters): {Math.floor(current.radius)}</div>
							</div>
						);
					})}
				</form>
			</div>
			{/* I wrapped the google map window in a container that has its height and width specified. It doesnt have to be an exact value but it needs to be something otherwise itll be 0x0 */}
			{showMap && isLoaded && (
				<div className="flex flex-col">
					<div className="  w-1/2 sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px]  h-[650px] z-10 ">
						<GoogleMapWindow
							setSelectedCoordinates={(
								selectedCoordinate: { lat: number; lng: number; radius: number } | null,
							) => onMapSubmit(selectedCoordinate)}
							deleteCoordinate={deleteCoordinate}
							defaultMapCoordinate={defaultMapCoordinate}
							selectedCoordinate={null}
							locations={locations}
							setLocations={setLocations}
						/>
					</div>
					<div>Click to place an icon</div>
					<div>Click on a marker to remove it</div>
					<div>Drag the R icon to resize the radius</div>
				</div>
			)}
		</div>
	);
};

export default NewGame;
