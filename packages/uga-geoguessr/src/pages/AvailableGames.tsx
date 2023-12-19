import { useContext, useEffect, useState } from "react";
import GameTypeWindow from "../components/GameType/GameTypeWindow";
import axios from "axios";
import PlayGameTypeModal from "../components/GameType/GameTypeModal/PlayGameTypeModal";
import UserContext from "../components/auth/Context/UserContext";
import { Link } from "react-router-dom";

export type GameType = {
	title: String;
	description: String;
	url: String;
	_id: String;
};
/**
 * Retrieves a user by ID.
 * @returns A page that fetches the default documents and the users documents and displays them
 */
function AvailableGames() {
	const exampleDefaultGames: GameType[] = [
		{
			title: "Entire Campus",
			description: "Guess your way around the entire campus",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
			_id: "default01",
		},
		{
			title: "North Campus",
			description: "Explore the north campus!",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171665469791539270/historic-4775425_1920-1800x1000.jpg?ex=655d8180&is=654b0c80&hm=45f8129baf5f522a5ac0fe64f27cf8540ad6e849039c03c6b5814ac1cfd6c662&",
			_id: "default02",
		},
		{
			title: "South Campus",
			description: "Explore South Campus",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171667786343395348/woocommerce-15.jpg?ex=655d83a8&is=654b0ea8&hm=25031174744dd94b29abc8f2faff18c5d6b827899ad12db9cb6dc08bc91ed0ca&",
			_id: "default03",
		},
	];

	const [userGameTypes, setUserGameTypes] = useState<GameType[] | null>(null);
	const [modalData, setModalData] = useState<GameType | null>(null);
	const fetchData = async () => {
		try {
			let token = localStorage.getItem("auth-token");
			if (!token) throw new Error("Must be logged in");
			const response = await axios.get("http://localhost:4000/api/gametypes", {
				headers: { "x-auth-token": token },
			});
			const data = await response.data;
			if (data) {
				setUserGameTypes(data);
			} else {
				throw new Error("No data");
			}
		} catch (error: any) {
			console.error(error.message);
			setUserGameTypes(null);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	const { auth } = useContext(UserContext);
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
				fetchData={null}
				title={"Default Game Types"}
				gameTypes={exampleDefaultGames}
				setModalData={setModalData}
			></GameTypeWindow>
			{(auth.valid || auth.loading) && (
				<>
					<GameTypeWindow
						fetchData={fetchData}
						title={"Custom Game Types"}
						gameTypes={userGameTypes}
						setModalData={setModalData}
					></GameTypeWindow>
					<div className="flex justify-center my-4">
						<Link
							to="/addgame"
							className={`text-white  bg-ugared-200 hover:bg-ugared-300 my-auto p-2 rounded-full  font-bold  `}
						>
							Add GameType
						</Link>
					</div>
				</>
			)}
		</div>
	);
}

export default AvailableGames;
