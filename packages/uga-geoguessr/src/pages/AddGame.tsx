import React, { useEffect, useState } from "react";
import { GameIdProvider } from "../components/GameType/NewGameType/GameIdContext";
import NewGameType from "../components/GameType/NewGameType/NewGameType"; // Assuming the path to your NewGame component
import axios from "axios";
import ErrorPage from "./ErrorPage";

const AddGameType: React.FC = () => {
	const [error, setError] = useState<string>("");
	const handleAddGame = async (game: any) => {
		try {
			let token = localStorage.getItem("auth-token");
			const response = await axios.post("http://localhost:4000/api/gametypes", game, {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				},
			});

			const data = response.data;
			if (data.success) {
				setError("");
				console.log("New game added:", game);
				return true;
			} else {
				throw new Error("Data not posted");
			}
		} catch (error: any) {
			console.log(error);
			setError(error.response.data.msg && error.response.data.msg);
			console.error(error.message);
			return false;
		}

		// You can perform other actions with the added game data
	};
	const [token, setToken] = useState<string | null>("");
	useEffect(() => {
		setToken(localStorage.getItem("auth-token"));
	}, []);
	if (!token) return <ErrorPage error={"Sign in to create a GameType"}></ErrorPage>;
	return (
		<div className="text-ugatan-100">
			<h2 className="text-center text-xl my-2">Add new GameType</h2>
			{error && (
				<div className="text-center" style={{ color: "red" }}>
					{error}
				</div>
			)}
			{/* You can add other components or content here */}
			<GameIdProvider>
				<NewGameType editGameType={null} onAddGame={handleAddGame} />
			</GameIdProvider>
		</div>
	);
};

export default AddGameType;
