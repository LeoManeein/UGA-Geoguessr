import { useEffect, useState } from "react";
import GameTypeWindow from "../components/GameType/GameTypeWindow";
import axios from "axios";

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

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:4000/api/gametype");
			const data = await response.data;
			if (data) {
				setDefaultGameTypes(data.defaultGames);
				setUserGameTypes(data.usersGames);
			} else {
				throw new Error("No data");
			}
		} catch (error) {
			console.error(error);
			setDefaultGameTypes(null);
			setUserGameTypes(null);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<GameTypeWindow
				title={"Default Game Types"}
				gameTypes={defaultGameTypes || exampleDefaultGames}
			></GameTypeWindow>
			<GameTypeWindow title={"Custom Game Types"} gameTypes={userGameTypes}></GameTypeWindow>
		</>
	);
}

export default AvailableGames;
