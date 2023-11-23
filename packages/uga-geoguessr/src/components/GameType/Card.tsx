import { GameType } from "../../pages/AvailableGames";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import axios from "axios";
interface Props {
	gameType: GameType;
}
/**
 *
 * @param gametype: The gametype that the card will display.
 * @returns A card that will show the details and image of the gameType.
 */
const Card: React.FC<Props> = ({ gameType }) => {
	const navigate = useNavigate();

	// Makes a request for a new GAME to be created using the current GAMETYPE
	async function handleGameRequest() {
		try {
			const response = await axios.get(`http://localhost:4000/api/gametype/${gameType.id}/create`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

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
		<div className={styles.flip_card}>
			<div className={`${styles.card} hover:cursor-pointer `}>
				<div className={` w-full  h-[300px]  ${styles.front}`}>
					<div className={`rounded-lg w-[100%] h-[100%] `}>
						<img
							alt={"img"}
							className={` w-full h-full object-cover select-none  ${styles.card} `}
							src={gameType.url as string}
						></img>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={`${styles.back} w-full flex flex-col justify-between`}>
					<div className={` w-[100%] text-center text-white text-3xl `}>{gameType.title}</div>
					<div className={` w-[100%] text-center text-white text-xl `}>{gameType.description}</div>
					<div className="w-full text flex mb-2">
						<div
							onClick={() => {
								// INSTEAD OF MAKING THE REQUEST HERE, PLEASE MAKE A MODAL
								// This should instead call the function that causes the modal to show up.
								handleGameRequest();
							}}
							className={`m-auto p-4  ${styles.playbtn}  rounded-full hover:cursor-pointer`}
						>
							<PlayCircleOutlined style={{ fontSize: "42px" }} className={`text-white   `} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
