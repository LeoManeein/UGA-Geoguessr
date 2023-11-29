import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import UserContext from "../components/auth/Context/UserContext";
import { useLoadScript } from "@react-google-maps/api";
import Heatmap from "../components/Profile/Headmap";
import Banner from "../components/Header/Banner";

const Profile: React.FC = () => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
		libraries: ["visualization"],
	});
	const { auth, userData } = useContext(UserContext);
	const [pastGameData, setPastGameData] = useState<
		| [
				{
					gameTypeTitle: String;
					gameTypeId: String;
					stages: [
						{
							distance: number;
							percentage: number;
							score: number;
							selectedLocation: {
								lat: number;
								lng: number;
							};
							answerLocation: {
								lat: number;
								lng: number;
							};
						},
					];
				},
		  ]
		| null
	>(null);
	const [error, setError] = useState<string>("");
	const [email, setEmail] = useState("");
	const [gamesPlayed, setGamesPlayed] = useState(0);
	const [firstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [username, setUsername] = useState("");

	const checkLoggedIn = async () => {
		try {
			let token = localStorage.getItem("auth-token");
			if (token === null) {
				localStorage.setItem("auth-token", "");
				token = "";
			}
			const tokenResponse = await axios.post("http://localhost:4000/api/users/tokenIsValid", null, {
				headers: { "x-auth-token": token },
			});

			if (tokenResponse.data) {
				const userRes = await axios.get("http://localhost:4000/api/users/pastGameData", {
					headers: { "x-auth-token": token },
				});

				if (userRes.data) {
					setPastGameData(userRes.data.pastGameData);
					setGamesPlayed(userRes.data.gamesPlayed);
				}
			}
		} catch (error: any) {
			console.error(error?.response?.data?.msg || error?.message || "error");
			setError(error?.response?.data?.msg || error?.message || "error");
		}
	};
	useEffect(() => {
		checkLoggedIn();
	}, []);
	useEffect(() => {
		if (userData && userData.user) {
			setEmail(userData.user.email);
			setFirstName(userData.user.firstName);
			setLastName(userData.user.lastName);
			setUsername(userData.user.username);
		}
	}, [userData]);

	console.log(Array.isArray(pastGameData) && pastGameData.length);

	if (auth.loading) return <div></div>;
	if (!auth.valid || loadError) return <ErrorPage error={error || "Please login"}></ErrorPage>;

	return (
		<div className="text-ugatan-100 mx-4">
			<div className="text-center">
				<Banner text="Profile"></Banner>
				{error && (
					<div className="text-center" style={{ color: "red" }}>
						{error}
					</div>
				)}
				<div>{username}</div>
				<div>{email}</div>
				<div>
					{firstName} {LastName}
				</div>
				<div>Number of games played: {gamesPlayed}</div>
			</div>

			<div className="flex flex-col md:flex-row  m-auto justify-center text-ugatan-100 ">
				<div className="input w-full sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px] ">
					<div className="flex flex-col mr-6">
						<div className="text-center">
							Completed games: {(Array.isArray(pastGameData) && pastGameData.length) || 0}
						</div>
						<div className="flex justify-center items-center h-[80vh]">
							{pastGameData && (
								<div className=" w-full h-full overflow-y-auto overflow-x-hidden">
									{pastGameData.map((game, index) => {
										return (
											<div
												key={game.gameTypeTitle + index.toString() + Math.random().toString()}
												className="m-4 border p-2 rounded-md"
											>
												<div>Game #{index + 1}</div>
												<div>GameType: {game.gameTypeTitle}</div>
												<div className="">
													{game.stages.map((stage, i) => {
														return (
															<div
																key={Math.random() + "stage"}
																className="flex bg-ugagrey-100 my-2 p-2 rounded-md"
															>
																<div>
																	<div>Round {i + 1}</div>
																	<div>Score: {stage.score}</div>
																	<div>Distance: {stage.distance}</div>
																</div>
															</div>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
				{isLoaded && (
					<div className="flex flex-col">
						<div className="text-center">Your accuracy:</div>
						<div className="  w-full sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px]  h-[650px] z-10 ">
							{isLoaded && pastGameData && (
								<div className="  w-full sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px]  h-[650px] z-10 ">
									<Heatmap pastGameData={pastGameData} />
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
