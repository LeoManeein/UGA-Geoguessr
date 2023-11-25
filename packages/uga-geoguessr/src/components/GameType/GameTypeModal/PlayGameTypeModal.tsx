import { useState } from "react";
import { GameType } from "../../../pages/AvailableGames";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../../Globals.module.css";
import Switch from "./Switch";
import { CloseOutlined } from "@ant-design/icons";
import { MoonLoader } from "react-spinners";
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
	const [clicked, setClicked] = useState(false);
	async function handleGameRequest() {
		try {
			setClicked(true);
			const response = await axios.post(
				`http://localhost:4000/api/games`,
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

			console.log(response);

			if (response.status === 200) {
				setClicked(false);
				const data = response.data;
				navigate(`${data}`);
			} else {
				console.error("API request failed");
				setClicked(false);
			}
		} catch (error: any) {
			// Handle network errors or other exceptions here
			console.error("An error occurred", error.message);
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
				{!clicked && (
					<div
						onClick={() => {
							handleGameRequest();
						}}
						className={`  w-[200px]  h-[43px] z-50  text-center pt-[4px] mt-1 ${styles.button} `}
					>
						Play Game
					</div>
				)}

				{clicked && (
					<div className={`  w-[200px]  h-[43px] flex justify-center  pt-[4px] mt-1 ${styles.button2}`}>
						<MoonLoader className="m-auto" color={"white"} size={25}></MoonLoader>
					</div>
				)}
			</div>
		</div>
	);
};

export default PlayGameTypeModal;
