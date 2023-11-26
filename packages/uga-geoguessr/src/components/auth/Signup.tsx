import axios, { AxiosError } from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./Context/UserContext";
type LatLngLiteral = google.maps.LatLngLiteral;

const Signup: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { setUserData, userData } = useContext(UserContext);
	async function handleSubmit(e: any) {
		e.preventDefault();
		setLoading(true);

		if (!email || !username || !password || !confirmPassword) {
			setError("Please fill in all fields.");
			setLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			setLoading(false);
			return;
		}

		try {
			const newUser = { email, password, confirmPassword, username };

			await axios.post("http://localhost:4000/api/users/signup", newUser);
			const loginRes = await axios.post("http://localhost:4000/api/users/login", {
				email,
				password,
			});

			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});

			localStorage.setItem("auth-token", loginRes.data.token);
			setLoading(false);
			navigate("/");
		} catch (error: any) {
			setLoading(false);
			if (error.response) {
				// Server responded with a status code other than 2xx
				setError(`Server error: ${error.response.data.msg}`);
			} else if (error.request) {
				// The request was made but no response was received
				setError("Network error. Please check your internet connection.");
			} else {
				// Something happened in setting up the request that triggered an Error
				setError("An unexpected error occurred. Please try again later.");
			}
		}
	}

	return (
		<div className="flex m-auto justify-center  ">
			<div className="input w-1/2 sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px] ">
				<>TEMP SIGNUP</>
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
					autoComplete="off"
					className="flex flex-col mx-4"
				>
					<label htmlFor="email">Email</label>
					<input
						className="text-black"
						id="gameName"
						type="text"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="username">Username</label>
					<input
						className="text-black"
						id="imageURL"
						type="text"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						className="text-black"
						id="imageURL"
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="password">Confirm Passowrd</label>
					<input
						className="text-black"
						id="imageURL"
						type="password"
						required
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					{error && <div style={{ color: "red" }}>{error}</div>}

					<button className="bg-ugared-200 mt-4 hover:bg-ugared-300" type="submit">
						Submit
					</button>
					<Link to={"/login"} className="bg-ugared-500 text-3xl mt-4 hover:bg-ugared-400" type="submit">
						Already have an account? Login
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Signup;
