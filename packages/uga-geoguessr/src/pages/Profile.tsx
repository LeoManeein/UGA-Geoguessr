import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage";

const Profile: React.FC = () => {
	const [token, setToken] = useState<string | null>("");
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
	useEffect(() => {
		try {
			const checkLoggedIn = async () => {
				let token = localStorage.getItem("auth-token");
				setToken(token);
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

					console.log(userRes.data);
					setEmail(userRes.data.email);
					setGamesPlayed(userRes.data.gamesPlayed);
					setFirstName(userRes.data.firstName);
					setLastName(userRes.data.lastName);
					setUsername(userRes.data.username);
					if (userRes.data) setPastGameData(userRes.data.pastGameData);
				}
			};
			checkLoggedIn();
		} catch (error: any) {
			console.error(error.response.data.msg || error.message || "error");
			setError(error.response.data.msg || error.message || "error");
		}
	}, []);
	useEffect(() => {}, [pastGameData]);
	if (!token) return <ErrorPage error={error || "please log in"}></ErrorPage>;
	return (
		<div className="text-ugatan-100 w-min m-auto">
			<h2 className="text-center text-xl my-2">Profile</h2>
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
			{pastGameData && (
				<div className="">
					{pastGameData.map((game, index) => {
						return (
							<div
								key={game.gameTypeTitle + index.toString() + Math.random().toString()}
								className="m-4 border p-2"
							>
								<div>game {index + 1}</div>
								<div>id:{game.gameTypeId}</div>
								<div>title:{game.gameTypeTitle}</div>
								<div className="">
									{game.stages.map((stage, i) => {
										return (
											<div key={Math.random() + "stage"} className="flex bg-ugagrey-100 my-2">
												<div>
													<div>Score: {stage.score}</div>
													<div>Distance: {stage.distance}</div>
													<div>Percentage: {stage.percentage}</div>
												</div>

												<div className="bg-green-600 m-2">
													<div>Correct lat: {stage.answerLocation.lat}</div>{" "}
													<div>Correct lng: {stage.answerLocation.lng}</div>
												</div>
												<div className="bg-red-600 m-2">
													<div>Selected lat: {stage.selectedLocation.lat}</div>{" "}
													<div>Selected lng: {stage.selectedLocation.lng}</div>
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
	);
};

export default Profile;
