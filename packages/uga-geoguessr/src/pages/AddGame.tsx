import React from "react";
import NewGameType from "../components/GameType/NewGameType/NewGameType"; // Assuming the path to your NewGame component

const AddGameType: React.FC = () => {
	const handleAddGame = async (game: any) => {
		try {
			const response = await fetch("/api/gametype", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(game),
			});

			console.log(game);

			const data = await response.json();
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
