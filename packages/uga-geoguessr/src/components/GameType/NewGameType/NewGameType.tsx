import { useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import GoogleMapWindow from "./GoogleMapWindow"; // Import the Google Maps component
import { Link } from "react-router-dom";
import classes from "../../../Globals.module.css";
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
			id: Math.random(),
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
					<label className="font-bold">Game Name</label>
					<input
						className="text-black"
						id="gameName"
						type="text"
						value={gameName}
						onChange={(e) => setGameName(e.target.value)}
					/>
					<label className="font-bold">Image URL</label>
					<input
						className="text-black"
						id="imageURL"
						type="text"
						value={imageURL}
						onChange={(e) => setImageURL(e.target.value)}
					/>
					<label className="font-bold">Description</label>
					<textarea
						className="text-black"
						id="description"
						rows={3}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					{error && <div style={{ color: "red" }}>{error}</div>}

					<button className="bg-ugared-200 mt-4 hover:bg-ugared-300 font-bold" type="submit">
						{editGameType ? "Submit" : "Submit"}
					</button>
					<div className="font-bold">Selected Locations:</div>
					<div className="grid grid-cols-3 text-center">
						<h2
							// onClick={(e) => {
							// 	let stringl = "";
							// 	locations.forEach((loc) => {
							// 		let thing = `{ lat: ${loc.lat}, lng: ${loc.lng}, radius: ${Math.trunc(
							// 			loc.radius,
							// 		)}},`;
							// 		stringl += thing;
							// 	});
							// 	navigator.clipboard.writeText(stringl);
							// 	console.log(stringl);
							// }}
							className="font-bold text-xl   break-words "
						>
							Lat
						</h2>
						<h2 className="font-bold text-xl   break-words ">Lng</h2>
						<h2 className="font-bold text-xl   break-words">Radius (meters)</h2>
						{locations.map((current, index) => {
							const oddoreven = index % 2 !== 0;
							return (
								<>
									<h2
										// onClick={(e) => {
										// 	let thing = `{ lat: ${current.lat}, lng: ${
										// 		current.lng
										// 	}, radius: ${Math.trunc(current.radius)}},`;
										// 	navigator.clipboard.writeText(thing);
										// }}
										className={` ${
											oddoreven ? "" : classes.light_background
										} font-bold text-xl  break-words w-full text-left pl-4`}
									>
										{current.lat}
									</h2>
									<h2
										className={`font-bold text-xl text-left pl-4   break-words ${
											oddoreven ? "" : classes.light_background
										}`}
									>
										{current.lng}
									</h2>
									<h2
										className={`font-bold text-xl   break-words ${
											oddoreven ? "" : classes.light_background
										}`}
									>
										{Math.floor(current.radius)}
									</h2>
								</>
							);
						})}
					</div>
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
					<div className="flex justify-between">
						<div>
							<div>Click on the map to place a possible location</div>
							<div>Click on a marker to remove it</div>
							<div>Drag a marker to move its location</div>
							<div>{`Drag the <> icon to resize the radius`}</div>
						</div>
						<Link
							to="/availablegames"
							className={`text-white bg-ugared-200 hover:bg-ugared-300 my-auto px-4 py-2 rounded-full  font-bold `}
						>
							Return
						</Link>
					</div>

					{/* <Link
						to={"/availableGames"}
						className="absolute top-6 right-6 text-ugared-300 bg-ugatan-100 p-2 font-bold rounded-full w-[130.6px] text-center z-20"
					>
						Cancel
					</Link> */}
				</div>
			)}
		</div>
	);
};

export default NewGameType;
