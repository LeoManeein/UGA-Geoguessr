import { GameType } from "../../pages/TestCss";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Card.module.css";
import { useSpring, animated } from "@react-spring/web";
import { PlayCircleOutlined } from "@ant-design/icons";
interface Props {
	gameType: GameType;
}

const Card: React.FC<Props> = ({ gameType }) => {
	const [isFlipped, setFlipped] = useState(false);

	const { transform, opacity } = useSpring({
		opacity: isFlipped ? 1 : 0,
		transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
		config: { friction: 18, tension: 150 },
	});

	const handleCardClick = () => {
		setFlipped(!isFlipped);
	};

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
					<div className={`${styles.light_background} w-[100%] text-center text-white text-3xl `}>
						{gameType.title}
					</div>
					<div className={`${styles.light_background} w-[100%] text-center text-white text-xl `}>
						{gameType.description}
					</div>
					<div className="w-full text flex mb-2">
						<Link
							to={"/ExampleGame"}
							className={`m-auto p-4  ${styles.playbtn}  rounded-full hover:cursor-pointer`}
						>
							<PlayCircleOutlined style={{ fontSize: "42px" }} className={`text-white   `} />
						</Link>
					</div>
				</div>
			</animated.div>
		</div>
	);
};

export default Card;
