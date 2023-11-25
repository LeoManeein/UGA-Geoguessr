import { useEffect, useState } from "react";
import GameTypeWindow from "../components/GameType/GameTypeWindow";
import axios from "axios";
import { difficultyType } from "./GamePage";
import PlayGameTypeModal from "../components/GameType/GameTypeModal/PlayGameTypeModal";

export type GameType = {
	title: String;
	description: String;
	url: String;
	id: number;
};
/**
 * Retrieves a user by ID.
 * @returns A page that fetches the default documents and the users documents and displays them
 */
function AvailableGames() {
	const exampleDefaultGames: GameType[] = [
		{
			title: "South Campus",
			description: "Explore South Campus with your friendsExplore South th your friends",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&",
			id: 51515,
		},
	];

	const [defaultGameTypes, setDefaultGameTypes] = useState<GameType[] | null>(null);
	const [userGameTypes, setUserGameTypes] = useState<GameType[] | null>(null);
	const [modalData, setModalData] = useState<GameType | null>(null);

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:4000/api/gametypes");
			const data = await response.data;
			console.log(data);
			if (data) {
				//setDefaultGameTypes(data.defaultGames);
				setUserGameTypes(data);
			} else {
				throw new Error("No data");
			}
		} catch (error: any) {
			console.error(error.message);
			//setDefaultGameTypes(null);
			setUserGameTypes(null);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="relative">
			{modalData && (
				<div
					className={`w-full h-full   fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center flex   z-40 `}
				>
					<PlayGameTypeModal gameType={modalData} setModalData={setModalData}></PlayGameTypeModal>
					<div
						onClick={() => {
							setModalData(null);
						}}
						className="w-full h-full  absolute"
					></div>
				</div>
			)}
			<GameTypeWindow
				title={"Default Game Types"}
				gameTypes={defaultGameTypes || exampleDefaultGames}
				setModalData={setModalData}
			></GameTypeWindow>
			<GameTypeWindow
				title={"Custom Game Types"}
				gameTypes={userGameTypes}
				setModalData={setModalData}
			></GameTypeWindow>
		</div>
	);
}

export default AvailableGames;
