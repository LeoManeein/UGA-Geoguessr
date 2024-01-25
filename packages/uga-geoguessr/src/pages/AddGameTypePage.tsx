import React, { useContext, useState } from "react";
import { GameIdProvider } from "../components/GameType/NewGameType/GameIdContext";
import NewGameType from "../components/GameType/NewGameType/NewGameType"; // Assuming the path to your NewGame component
import axios from "axios";
import ErrorPage from "./ErrorPage";
import UserContext from "../components/auth/Context/UserContext";
import Banner from "../components/Header/Banner";

const AddGameTypePage: React.FC = () => {
	const { auth } = useContext(UserContext);

	const [error, setError] = useState<string>("");
	const handleAddGame = async (game: any) => {
		try {
			let token = localStorage.getItem("auth-token");
			const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/gametypes`, game, {
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
			console.error(error?.response?.data?.msg || error?.message || "error");
			setError(error?.response?.data?.msg || error?.message || "error");
			return false;
		}

		// You can perform other actions with the added game data
	};
	if (auth.loading) return <div></div>;
	if (!auth.valid) return <ErrorPage error={"Login to create a GameType"}></ErrorPage>;
	return (
		<div className="text-ugatan-100 mx-4">
			<Banner text="Add GameType"></Banner>
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

export default AddGameTypePage;
