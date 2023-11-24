import { useState } from "react";
import { GameType } from "../../../pages/AvailableGames";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../../Globals.module.css";
import Switch from "./Switch";
import { CloseOutlined } from "@ant-design/icons";
interface Props {
	gameType: GameType;
	setModalData: Function;
}

const PlayGameTypeModal: React.FC<Props> = ({ gameType, setModalData }) => {
	const navigate = useNavigate();
	const [zoom, setZoom] = useState(true);
	const [compass, setCompass] = useState(true);
	const [movement, setMovement] = useState(true);
	const [numberOfStages, setNumberOfStages] = useState(3);
	async function handleGameRequest() {
		try {
			const response = await axios.post(
				`http://localhost:4000/api/game`,
				{
					gameType: gameType,
					numberOfStages: numberOfStages,
					difficulty: { zoom: zoom, compass: compass, movement: movement },
				},
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
		<div className="h-[300px] w-[600px] m-auto z-50 bg-ugared-100 flex flex-col p-4 rounded-3xl relative">
			<CloseOutlined
				onClick={() => setModalData(null)}
				className="absolute top-0 right-2 text-2xl hover:text-white"
			></CloseOutlined>
			<div
				className={`flex w-[250px] text-center justify-center ${styles.background} text-white justify-center text-center text-3xl mx-auto font-bold pb-1 rounded-md`}
			>
				Difficulty
			</div>
			<div className="my-auto flex justify-center">
				<div className="text-white font-bold mr-2">Number Of Stages:</div>
				<select
					className="w-[40px] text-center"
					value={numberOfStages} // Set the selected value based on state
					onChange={(event) => {
						const newValue = parseInt(event.target.value);
						setNumberOfStages(newValue);
					}} // Call the handler when the value changes
				>
					<option value={3}>3</option>
					<option value={5}>5</option>
					<option value={10}>10</option>
				</select>
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
