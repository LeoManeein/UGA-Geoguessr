import React, { useEffect, useState } from "react";
import { GameIdProvider } from "../components/GameType/NewGameType/GameIdContext";
import NewGameType, { PossibleLocation } from "../components/GameType/NewGameType/NewGameType"; // Assuming the path to your NewGame component
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
export type editGameType = {
	id: string;
	title: string;
	url: string;
	description: string;
	possibleCoordinates: PossibleLocation[];
};
const EditGameType: React.FC = () => {
	const [error, setError] = useState<string>("");
	const [editGame, setEditGame] = useState<null | editGameType>(null);
	const navigate = useNavigate();
	const id = useParams().id;
	const handleAddGame = async (game: any) => {
		try {
			let token = localStorage.getItem("auth-token");
			const response = await axios.put(`http://localhost:4000/api/gametypes/${id}`, game, {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				},
			});

			const data = response.data;
			if (data.success) {
				console.log("New game added:", game);
				setError("");
				navigate("/availablegames");
				return true;
			} else {
				throw new Error("Data not posted");
			}
		} catch (error: any) {
			setError(error.response.data.msg || error.message || "error");
			return false;
		}

		// You can perform other actions with the added game data
	};

	const fetchData = async () => {
		try {
			let token = localStorage.getItem("auth-token");
			const response = await axios.get(`http://localhost:4000/api/gametypes/${id}`, {
				headers: {
					"x-auth-token": token,
				},
			});
			const data = await response.data;
			if (data) {
				setEditGame(data);
				setError("");
				//console.log(data);
			} else {
				throw new Error("No data");
			}
		} catch (error: any) {
			setError(error.response.data.msg || error.message || "error");
			setEditGame(null);
		}
	};
	const [token, setToken] = useState<string | null>("");

	useEffect(() => {
		setToken(localStorage.getItem("auth-token"));

		fetchData();
	}, []);
	if (!token) return <ErrorPage error={"please sign in"}></ErrorPage>;
	return (
		<div className="text-ugatan-100">
			<h2 className="text-center text-xl my-2">Edit GameType</h2>
			{error && (
				<div className="text-center" style={{ color: "red" }}>
					{error}
				</div>
			)}
			{/* You can add other components or content here */}
			{editGame && (
				<GameIdProvider>
					<NewGameType editGameType={editGame} onAddGame={handleAddGame} />
				</GameIdProvider>
			)}
		</div>
	);
};

export default EditGameType;
