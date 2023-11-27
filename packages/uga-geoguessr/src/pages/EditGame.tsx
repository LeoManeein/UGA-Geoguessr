import React, { useContext, useEffect, useState } from "react";
import { GameIdProvider } from "../components/GameType/NewGameType/GameIdContext";
import NewGameType, { PossibleLocation } from "../components/GameType/NewGameType/NewGameType"; // Assuming the path to your NewGame component
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import UserContext from "../components/auth/Context/UserContext";
export type editGameType = {
	id: string;
	title: string;
	url: string;
	description: string;
	possibleCoordinates: PossibleLocation[];
};
const EditGameType: React.FC = () => {
	const { auth } = useContext(UserContext);
	const [error, setError] = useState<string>("");
	const [editGame, setEditGame] = useState<null | editGameType>(null);
	const navigate = useNavigate();
	const id = useParams().id;
	const handleAddGame = async (game: any) => {
		try {
			let token = localStorage.getItem("auth-token");
			const response = await axios.put(`${process.env.REACT_APP_BACKEND}/api/gametypes/${id}`, game, {
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
			console.error(error?.response?.data?.msg || error?.message || "error");
			setError(error?.response?.data?.msg || error?.message || "error");
			return false;
		}

		// You can perform other actions with the added game data
	};

	const fetchData = async () => {
		try {
			let token = localStorage.getItem("auth-token");
			const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/gametypes/${id}`, {
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

	useEffect(() => {
		fetchData();
	}, []);
	if (auth.loading) return <div></div>;
	if (!auth.valid) return <ErrorPage error={"Sign in to edit a gameType"}></ErrorPage>;
	return (
		<div className="text-ugatan-100 mx-4">
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
