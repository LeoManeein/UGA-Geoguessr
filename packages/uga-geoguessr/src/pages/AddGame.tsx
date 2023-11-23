import React from "react";
import NewGameType from "../components/GameType/NewGameType/NewGameType"; // Assuming the path to your NewGame component
import axios from "axios";
import { GameType } from "./AvailableGames";

const AddGameType: React.FC = () => {
	const handleAddGame = async (game: any) => {
		try {
			const response = await axios.post("http://localhost:4000/api/gametype", game, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log(game);

			const data = response.data;
			console.log(data);
			if (data.success) {
				console.log("New game added:", game);
			} else {
				throw new Error("Data not posted");
			}
		} catch (error) {
			console.error(error);
		}

		// You can perform other actions with the added game data
	};

	return (
		<div className="text-ugatan-100">
			<h2>Test NewGame Component</h2>
			{/* You can add other components or content here */}
			<NewGameType onAddGame={handleAddGame} />
		</div>
	);
};

export default AddGameType;
