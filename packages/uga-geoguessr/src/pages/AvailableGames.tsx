import styles from "../Globals.module.css";
import Card from "../components/GameType/Card";
import { useEffect, useState } from "react";

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

	const [data, setData] = useState<GameType[] | null>(null);
	const fetchData = () => {
		fetch(`/api/gametype/`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Data not found");
				}
				return response.json();
			})
			.then((data) => {
				setData(data);
			})
			.catch((error) => {
				setData(null);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="mx-2 mt-6 ">
			<div
				className={` md:m-auto w-full md:w-[768px] h-full pb-1 bg-gradient-to-r  ${styles.background} rounded-lg`}
			>
				<div
					className={`w-full text-white justify-center text-center text-6xl pb-2 font-bold ${styles.light_background} rounded-t-lg `}
				>
					Select Game Type
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-1 w-full  p-2">
					{/* {exampleDefaultGames.map((item, index) => (
						<Card key={item.title.toString() + index.toString()} gameType={item}></Card>
					))} */}
					{!data && <div className="h-[300px]" />}
					{data &&
						data.map((item, index) => (
							<Card key={item.title.toString() + index.toString()} gameType={item}></Card>
						))}
				</div>
			</div>
		</div>
	);
}

export default AvailableGames;
