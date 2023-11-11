import { GameType } from "../../pages/AvailableGames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { useSpring, animated } from "@react-spring/web";
import { PlayCircleOutlined } from "@ant-design/icons";
interface Props {
	gameType: GameType;
}

const Card: React.FC<Props> = ({ gameType }) => {
	const [isFlipped, setFlipped] = useState(false);
	const navigate = useNavigate();
	const { transform, opacity } = useSpring({
		opacity: isFlipped ? 1 : 0,
		transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
		config: { friction: 18, tension: 150 },
	});

	const handleCardClick = () => {
		setFlipped(!isFlipped);
	};

	async function handleGameRequest() {
		try {
			const response = await fetch(`api/gametype/${gameType.id}/create`, {
				method: "GET", // You can change this to the HTTP method you need (GET, POST, etc.)
				headers: {
					// Add any headers you might need (e.g., authentication headers)
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const data = await response.json();
				// Do something with the data received from the API

				navigate(`${data}`);
				console.log(data);
			} else {
				// Handle errors here (e.g., show an error message to the user)
				console.error("API request failed");
			}
		} catch (error) {
			// Handle network errors or other exceptions here
			console.error("An error occurred", error);
		}
	}

	return (
		<div className={styles.flip_card} onClick={handleCardClick}>
			<animated.div
				className={`${styles.card} hover:cursor-pointer `}
				style={{
					opacity: opacity.to((o) => 1 - o),
					transform,
				}}
			>
				<div className={` w-full  h-[300px]  ${styles.front}`}>
					<div className={`rounded-lg w-[100%] h-[100%] `}>
						<img
							alt={"img"}
							className={` w-full h-full object-cover select-none ${styles.card} `}
							src={gameType.url as string}
						></img>
					</div>
				</div>
			</animated.div>
			<animated.div
				className={styles.card}
				style={{
					opacity,
					transform: transform.to((t) => `${t} rotateY(180deg)`),
				}}
			>
				<div className={`${styles.back} w-full flex flex-col justify-between`}>
					<div className={` w-[100%] text-center text-white text-3xl `}>{gameType.title}</div>
					<div className={` w-[100%] text-center text-white text-xl `}>{gameType.description}</div>
					<div className="w-full text flex mb-2">
						<div
							onClick={() => {
								handleGameRequest();
							}}
							className={`m-auto p-4  ${styles.playbtn}  rounded-full hover:cursor-pointer`}
						>
							<PlayCircleOutlined style={{ fontSize: "42px" }} className={`text-white   `} />
						</div>
					</div>
				</div>
			</animated.div>
		</div>
	);
};

export default Card;
