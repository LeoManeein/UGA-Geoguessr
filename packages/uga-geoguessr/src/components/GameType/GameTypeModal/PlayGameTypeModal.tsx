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
	const [error, setError] = useState("");
	async function handleGameRequest() {
		try {
			setClicked(true);
			let token = localStorage.getItem("auth-token");
			const headers = token
				? {
						headers: {
							"Content-Type": "application/json",
							"x-auth-token": token,
						},
				  }
				: {
						headers: {
							"Content-Type": "application/json",
						},
				  };
			const response = await axios.post(
				`http://localhost:4000/api/games`,
				{
					gameType: gameType,
					numberOfStages: numberOfStages,
					difficulty: { zoom: zoom, compass: compass, movement: movement },
				},
				headers,
			);

			console.log(response);

			if (response.status === 200) {
				setClicked(false);
				const data = response.data;
				navigate(`${data}`);
				setError("");
			} else {
				throw new Error("whoops");
			}
		} catch (error: any) {
			// Handle network errors or other exceptions here
			setClicked(false);
			console.error(error?.response?.data?.msg || error?.message || "error");
			setError(error?.response?.data?.msg || error?.message || "error");
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
				<div className="text-white font-bold mr-2">Number of rounds:</div>
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
			{error && <div className="text-orange-200 text-center">{error}</div>}
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
