import { GameType } from "../../pages/AvailableGames";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { DeleteOutlined, EditOutlined, PlayCircleOutlined } from "@ant-design/icons";
import axios from "axios";
interface Props {
	gameType: GameType;
	setModalData: Function;
	fetchData: Function | null;
}
/**
 *
 * @param gametype: The gametype that the card will display.
 * @returns A card that will show the details and image of the gameType.
 */
const Card: React.FC<Props> = ({ gameType, setModalData, fetchData }) => {
	const navigate = useNavigate();

	async function handleDeleteRequest() {
		try {
			let token = localStorage.getItem("auth-token");
			const response = await axios.delete(`http://localhost:4000/api/gametypes/${gameType._id}/`, {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				},
			});

			if (response.status === 200) {
				const data = response.data;
				console.log("deleted");
				if (fetchData) {
					fetchData();
				}
			} else {
				console.error("API request failed");
			}
		} catch (error: any) {
			// Handle network errors or other exceptions here
			console.error("An error occurred", error.message);
		}
	}
	return (
		<div className={styles.flip_card}>
			{fetchData && (
				<>
					<Link className=" absolute bottom-1 right-1 z-20" to={`/editgame/${gameType._id}`}>
						<EditOutlined style={{ color: "white" }} />
					</Link>
					<div
						onClick={() => handleDeleteRequest()}
						className="hover:cursor-pointer absolute bottom-1 right-6 z-20"
					>
						<DeleteOutlined style={{ color: "white" }} />
					</div>
				</>
			)}
			<div className={`${styles.card} hover:cursor-pointer  `}>
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
				<div className={`${styles.back} w-full flex flex-col justify-between `}>
					<div className={` w-[100%]  break-words text-center text-white text-3xl `}>
						{gameType.title.slice(0, 30)}
					</div>
					<div className={` w-[100%] break-words text-center text-white text-xl `}>
						{gameType.description.slice(0, 90)}
					</div>
					<div className="w-full text flex mb-2">
						<div
							onClick={() => {
								// INSTEAD OF MAKING THE REQUEST HERE, PLEASE MAKE A MODAL
								// This should instead call the function that causes the modal to show up.
								//handleGameRequest();
								setModalData(gameType);
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
