import axios from "axios";
import { useEffect, useState } from "react";
import classes from "../Globals.module.css";

/**
 *
 * @param gametype: The gametype that the card will display.
 * @returns A card that will show the details and image of the gameType.
 */
const Leaderboard: React.FC = ({}) => {
	const [leaderboardData, setLeaderboardData] = useState<null | {
		topUsers: [
			{
				username: String;
				gamesPlayed: number;
				totalScore: number;
			},
		];
	}>(null);
	const fetchLeaderBoardDAta = async () => {
		try {
			const response = await axios.get(`http://localhost:4000/api/leaderboards/`, {});
			const data = await response.data;
			if (data) {
				console.log(data);
				setLeaderboardData(data);
			} else {
				throw new Error("No data");
			}
		} catch (error: any) {}
	};

	useEffect(() => {
		fetchLeaderBoardDAta();
	}, []);
	if (!leaderboardData) return <div></div>;
	return (
		<div className="flex flex-col text-white">
			<h1 className="font-bold text-3xl w-full md:w-[600px] text-center">Leaderboard</h1>
			<div className="w-full md:w-[600px] flex">
				<h2 className="font-bold text-xl w-1/3 md:w-[200px]">User</h2>
				<h2 className="font-bold text-xl w-1/3 md:w-[200px]">Games Played</h2>
				<h2 className="font-bold text-xl w-1/3 md:w-[200px]">Total Score</h2>
			</div>

			{leaderboardData.topUsers.map((user, index) => {
				console.log(index % 2 !== 0);
				const oddoreven = index % 2 !== 0;
				return (
					<div
						className={`flex w-full md:w-[600px] justify-between ${
							oddoreven ? "" : classes.light_background
						}`}
					>
						<div className="w-1/3 md:w-[200px]">{user.username}</div>
						<div className="w-1/3 md:w-[200px]">{user.gamesPlayed}</div>
						<div className="w-1/3 md:w-[200px]">{user.totalScore}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Leaderboard;
