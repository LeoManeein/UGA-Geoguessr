import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "../Globals.module.css";
import { useContext } from "react";
import UserContext from "../components/auth/Context/UserContext";
import Leaderboard from "../components/Leaderboard";
export type GameType = {
	title: String;
	description: String;
	url: String;
};
/**
 *
 * @returns Homepage for the website
 */
function Home() {
	const exampleDefaultGames: GameType[] = [
		{
			title: "South Campus",
			description: "Explore South Campus with your friendsExplore South th your friends",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&",
		},
		{
			title: "Entire Campus",
			description: "Guess your way around the entire campus",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
		},
		{
			title: "South Campus",
			description: "Explore South Campus with your friends",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&",
		},
		{
			title: "Entire Campus",
			description: "Guess your way around the entire campus",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
		},
	];

	const { auth } = useContext(UserContext);
	if (auth.loading) return <div></div>;
	return (
		<div>
			<div className="mx-2 mt-12 flex md:flex-row flex-col m-auto justify-center">
				<div
					className={` mr-32  w-full md:w-[632px] h-full pb-1 bg-gradient-to-r  text-center md:text-left ${styles.background} rounded-lg`}
				>
					<div className=" w-full md:w-[274px] border-b-4 border-ugared-500 mb-8 "></div>
					<div className=" text-6xl md:text-8xl text-ugared-300">UGA</div>
					<div className="text-6xl md:text-8xl text-ugared-300">GEOGUESSR</div>
					<Link
						to={auth.valid ? "/availablegames" : "/login"}
						className="bg-ugatan-100 w--full md:w-[460px] h-[119px] rounded-full text-center justify-center flex mt-12 "
					>
						<div className="m-auto flex  text-3xl text-center justify-center content-center text-ugared-400 ">
							{auth.valid && (
								<>
									Play <ArrowRightOutlined className="pt-[6px] pl-2 m-auto" />
								</>
							)}
							{!auth.valid && (
								<>
									Login in to play <ArrowRightOutlined className="pt-[6px] pl-2 m-auto" />
								</>
							)}
						</div>
					</Link>
					<div className="text-ugatan-100 w-full md:w-[569px] mt-12 text-2xl">
						Explore the University of Georgia's campus and see how well you really know your way around.
					</div>
					<div className="text-ugatan-100 w-full md:w-[569px] mt-4 text-2xl">
						Create an account to create your own custom gamemodes
					</div>
				</div>
				<div className={`flex justify-center  w-full md:w-[327px] h-[471px] pb-1 rounded-lg`}>
					<img
						alt={"img"}
						className={` w-[327px] h-[471px] object-cover select-none rounded-full p-6 border-4 border-ugatan-100 `}
						src={exampleDefaultGames[1].url as string}
					></img>
				</div>
			</div>
			<div className="flex justify-center">
				<Leaderboard></Leaderboard>
			</div>
		</div>
	);
}

export default Home;
