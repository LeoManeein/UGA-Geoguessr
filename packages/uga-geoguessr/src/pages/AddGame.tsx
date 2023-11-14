import React from "react";
import NewGame from "../components/NewGame/NewGame"; // Assuming the path to your NewGame component

const TestNewGamePage: React.FC = () => {
	const handleAddGame = (game: any) => {
		console.log("New game added:", game);
		// You can perform other actions with the added game data
	};

	return (
		<div className="text-ugatan-100">
			<h2>Test NewGame Component</h2>
			{/* You can add other components or content here */}
			<NewGame onAddGame={handleAddGame} />
		</div>
	);
};

export default TestNewGamePage;
