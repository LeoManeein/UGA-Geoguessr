import { useEffect, useState } from "react";
import GameTypeWindow from "../components/GameType/GameTypeWindow";

export type GameType = {
	title: String;
	description: String;
	url: String;
	id: number;
};

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
			const response = await fetch(`/api/gametype/`);
			if (!response.ok) {
				throw new Error("Error fetching data");
			}
			const data = await response.json();
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
