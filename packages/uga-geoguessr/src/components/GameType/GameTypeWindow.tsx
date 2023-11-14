import { GameType } from "../../pages/AvailableGames";
import styles from "../../Globals.module.css";
import Card from "./Card";
interface Props {
	gameTypes: GameType[] | null;
	title: string;
}
/**
 * @param {GameType[] | null} gameTypes: GameType array or null. All the gametypes that will be displayed in the window.
 * @param {string} title: String that will be displayed as the title of the window
 * @returns A window containing an array of GameTypes that are mapped as cards
 */
const GameTypeWindow: React.FC<Props> = ({ gameTypes, title }) => {
	return (
		<div className="mx-2 mt-6 ">
			<div
				className={` md:m-auto w-full md:w-[768px] h-full pb-1 bg-gradient-to-r  ${styles.background} rounded-lg`}
			>
				<div className="text-6xl text-ugared-300 mb-12 border-b-4 border-ugared-500 pb-4 text-center">
					{title}
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-1 w-full  p-2 ">
					{!gameTypes && <div className="h-[300px]" />}
					{gameTypes &&
						gameTypes.map((item, index) => (
							<Card key={item.title.toString() + index.toString()} gameType={item}></Card>
						))}
				</div>
			</div>
		</div>
	);
};

export default GameTypeWindow;
