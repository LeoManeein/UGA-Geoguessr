import styles from "./TestCss.module.css";
import Card from "../components/GameType/Card";

export type GameType = {
	title: String;
	description: String;
	url: String;
};

function TestCss() {
	const exampleDefaultGames: GameType[] = [
		{
			title: "South Campus",
			description: "Explore South Campus with your friendsExplore South th your friends",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&",
		},
		{
			title: "Entire Campus1",
			description: "Guess your way around the entire campus",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
		},
		{
			title: "South Campus2",
			description: "Explore South Campus with your friends",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&",
		},
		{
			title: "Entire Campus3",
			description: "Guess your way around the entire campus",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170511318093135962/UGA_EastCampusVillage_Overall.jpg?ex=65594e9d&is=6546d99d&hm=ffb0ff941609aff72d75f880aa3fe9325b9f25ae6b9f438ec939cf81ef289720&",
		},
		{
			title: "South Campus4",
			description: "Explore South Campus with your friendsExplore South th your friends",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&",
		},
		{
			title: "Entire Campus5",
			description: "Guess your way around the entire campus",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
		},
		{
			title: "South Campus6",
			description: "Explore South Campus with your friends",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&",
		},
		{
			title: "Entire Campus7",
			description: "Guess your way around the entire campus",
			url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
		},
	];

	return (
		<div className="mx-2">
			<div
				className={` md:m-auto w-full md:w-[768px] h-full pb-1 bg-gradient-to-r  ${styles.background} rounded-lg`}
			>
				<div
					className={`w-full text-white justify-center text-center text-6xl pb-2 font-bold ${styles.light_background} rounded-t-lg `}
				>
					Select Game Type
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-1 w-full  p-2">
					{exampleDefaultGames.map((item, index) => (
						<Card key={item.title.toString() + index.toString()} gameType={item}></Card>
					))}
				</div>
			</div>
		</div>
	);
}

export default TestCss;
