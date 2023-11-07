import { Key } from "react";

export type GameType = {
	title: String;
	description: String;
	url: String;
};

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

	return (
		<>
			<div className="flex flex-col md:flex-row w-full pt-3 md:h-[800px] h-full px-2 gap-2">
				<div
					className={`bg-slate-600 w-full md:w-2/3 md:h-full h-[400px] flex items-center justify-center bg-[url('https://cdn.discordapp.com/attachments/1054239396024549486/1170214000827580426/Untitled.jpg?ex=655839b7&is=6545c4b7&hm=03754d93407e5de2746e2aca8f938f0a3ffdd2c16fe43c1930f320eb88f21dd9&')] bg-cover bg-center  `}
				>
					<div className="w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
						<div className="text-white text-[2rem] md:text-[6rem] relative w-full px-[2rem]">
							Welcome to UGA
						</div>
					</div>
				</div>
				<div className="md:w-1/3 w-full h-full flex flex-col gap-2 ">
					<div className="w-full md:h-1/2 h-[200px] bg-ugared-100">Leaderboard</div>
					<div className="w-full  md:h-1/2 h-[200px] bg-ugagrey-100">Sign up </div>
				</div>
			</div>
			{/* <div className="grid grid-cols-1 2xl:grid-cols-2   ">
				{exampleDefaultGames.map((item, index) =>
					index % 2 === 0 ? (
						<div className="flex mt-2 px-2 gap-2 m-auto w-full  ">
							<div className=" w-1/2 md:w-[500px] aspect-square ">
								<img className=" w-full h-full object-cover rounded-lg" src={item.url as string}></img>
							</div>

							<div className="w-full bg-ugagrey-200">yo</div>
						</div>
					) : (
						<div className="flex mt-2 px-2 gap-2 w-full ">
							<div className="w-full bg-ugared-200">yo</div>
							<div className=" w-1/2 md:w-[500px] aspect-square ">
								<img className=" w-full h-full object-cover rounded-lg" src={item.url as string}></img>
							</div>
						</div>
					),
				)}
			</div> */}

			<div className="grid grid-cols-2 2xl:grid-cols-4 gap-2 mt-2 mx-2 overflow-hidden row ">
				{exampleDefaultGames.map((item, index) =>
					index % 3 === 0 ? (
						<div key={(item.title.toString() + Math.random()) as Key}>
							<div className=" w-full md:w-full aspect-square ">
								<img
									alt="yo"
									className=" w-full h-full object-cover rounded-lg"
									src={item.url as string}
								></img>
							</div>

							<div className={`w-full bg-ugared-200 aspect-square`}>
								<div className=" justify-center text-left text-white text-[6vw] 2xl:text-[4vw] flex w-4/5 m-auto text-clip ">
									{item.title}
								</div>
								<div className="justify-center text-left text-white text-[3vw] sm:text-[3vw] md:text-[4vw] flex w-4/5 m-auto overflow-hidden 2xl:text-[2vw]">
									{item.description}
								</div>
							</div>
						</div>
					) : (
						<div key={(item.title.toString() + Math.random()) as Key}>
							<div className={`w-full bg-ugagrey-200 aspect-square`}>
								<div className=" justify-center text-left text-white text-[6vw] 2xl:text-[4vw] flex w-4/5 m-auto text-clip ">
									{item.title}
								</div>
								<div className="justify-center text-left text-white text-[3vw] sm:text-[3vw] md:text-[4vw] flex w-4/5 m-auto overflow-hidden 2xl:text-[2vw]">
									{item.description}
								</div>
							</div>
							<div className=" w-full md:w-full aspect-square ">
								<img
									alt="yo"
									className=" w-full h-full object-cover rounded-lg"
									src={item.url as string}
								></img>
							</div>
						</div>
					),
				)}
			</div>

			{/* <Link to="/ExampleGame" className="text-purple-700">
				Example Game
			</Link> */}
		</>
	);
}

export default Home;
