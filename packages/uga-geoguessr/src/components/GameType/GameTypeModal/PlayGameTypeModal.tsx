import { useState } from "react";
import { GameType } from "../../../pages/AvailableGames";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../../Globals.module.css";
import Switch from "./Switch";
interface Props {
	gameType: GameType;
	setModalData: Function;
}

const PlayGameTypeModal: React.FC<Props> = ({ gameType, setModalData }) => {
	const navigate = useNavigate();
	const [zoom, setZoom] = useState(true);
	const [compass, setCompass] = useState(true);
	const [movement, setMovement] = useState(true);

	async function handleGameRequest() {
		try {
			const response = await axios.post(
				`http://localhost:4000/api/game`,
				{ gameType: gameType, difficulty: { zoom: zoom, compass: compass, movement: movement } },
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status === 200) {
				const data = response.data;
				navigate(`${data}`);
			} else {
				console.error("API request failed");
			}
		} catch (error) {
			// Handle network errors or other exceptions here
			console.error("An error occurred", error);
		}
	}

	return (
		<div className="h-[300px] w-[600px] m-auto z-50 bg-ugared-100 flex flex-col p-4 rounded-3xl">
			<div
				className={`flex w-[250px] text-center justify-center ${styles.background} text-white justify-center text-center text-3xl mx-auto font-bold pb-1 rounded-md`}
			>
				Difficulty
			</div>
			<div className="my-auto">
				<div className=" w-full flex justify-around text-white font-bold ">
					<Switch text={"Zoom"} isChecked={zoom} setFunction={setZoom}></Switch>
					<Switch text={"Movement"} isChecked={movement} setFunction={setMovement}></Switch>
					<Switch text={"Compass"} isChecked={compass} setFunction={setCompass}></Switch>
				</div>
			</div>
			<div className="w-[200px] mx-auto">
				<div
					onClick={() => {
						handleGameRequest();
					}}
					className={`  w-[200px]  h-[43px] z-50  text-center pt-[4px] mt-1 ${styles.button} `}
				>
					Play Game
				</div>
			</div>
		</div>
	);
};

export default PlayGameTypeModal;
