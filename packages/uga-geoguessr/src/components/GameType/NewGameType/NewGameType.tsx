import { useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useGameId } from "./GameIdContext"; // keeps track of id's
import GoogleMapWindow from "./GoogleMapWindow"; // Import the Google Maps component
import { Link } from "react-router-dom";
type LatLngLiteral = google.maps.LatLngLiteral;

export type PossibleLocation = {
	lat: number;
	lng: number;
	radius: number;
};
interface NewGameProps {
	onAddGame: Function;
	editGameType: {
		id: string;
		title: string;
		url: string;
		description: string;
		possibleCoordinates: PossibleLocation[];
	} | null;
}
/**
 *
 * @param onAddGame: Function that takes a game as a parameter. Returns void.
 * @returns
 */
const NewGameType: React.FC<NewGameProps> = ({ onAddGame, editGameType }) => {
	const [gameName, setGameName] = useState<string>("");
	const [imageURL, setImageURL] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [locations, setLocations] = useState<PossibleLocation[]>([]);
	const [error, setError] = useState<string | null>(null);
	const { getNextId } = useGameId();
	useEffect(() => {
		if (!editGameType) return;
		setGameName(editGameType.title);
		setImageURL(editGameType.url);
		setDescription(editGameType.description);
		setLocations(editGameType.possibleCoordinates);
	}, [editGameType]);
	// The default position that the google maps starts at
	const defaultMapCoordinate = { lat: 33.951752641469085, lng: -83.37435458710178 } as LatLngLiteral;

	// Makes sure the google map loads.
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
		libraries: ["geometry", "visualization"],
	});

	const onMapSubmit = (selectedCoordinate: { lat: number; lng: number; radius: number } | null) => {
		if (selectedCoordinate) {
			setLocations([...locations, selectedCoordinate]);
		}
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

	const submitHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		const newGame = {
			id: getNextId().toString(),
			title: gameName,
			description: description,
			url: imageURL,
			possibleCoordinates: locations,
		};

		const success = await onAddGame(newGame);
		if (!success) return;
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
	if (loadError) return <div>Error</div>;
	return (
		<div className="flex m-auto justify-center  ">
			<div className="input w-1/2 sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px] ">
				<form onSubmit={submitHandler} autoComplete="off" className="flex flex-col mr-6">
					<label>Game Name</label>
					<input
						className="text-black"
						id="gameName"
						type="text"
						value={gameName}
						onChange={(e) => setGameName(e.target.value)}
					/>
					<label>Image URL</label>
					<input
						className="text-black"
						id="imageURL"
						type="text"
						value={imageURL}
						onChange={(e) => setImageURL(e.target.value)}
					/>
					<label>Description</label>
					<textarea
						className="text-black"
						id="description"
						rows={3}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					{error && <div style={{ color: "red" }}>{error}</div>}

					<button className="bg-ugared-200 mt-4 hover:bg-ugared-300" type="submit">
						{editGameType ? "Edit Game" : "Add Game"}
					</button>
					<div>Selected Locations:</div>
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
			{isLoaded && (
				<div className="flex flex-col">
					<div className="  w-1/2 sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px]  h-[650px] z-10 ">
						<GoogleMapWindow
							setSelectedCoordinates={(
								selectedCoordinate: { lat: number; lng: number; radius: number } | null,
							) => onMapSubmit(selectedCoordinate)}
							deleteCoordinate={deleteCoordinate}
							defaultMapCoordinate={defaultMapCoordinate}
							locations={locations}
							setLocations={setLocations}
						/>
					</div>
					<div>Click to place an icon</div>
					<div>Click on a marker to remove it</div>
					<div>Drag the R icon to resize the radius</div>
					<Link
						to={"/availableGames"}
						className="absolute top-6 right-6 text-ugared-300 bg-ugatan-100 p-2 font-bold rounded-full w-[130.6px] text-center z-20"
					>
						Cancel
					</Link>
				</div>
			)}
		</div>
	);
};

export default NewGameType;
