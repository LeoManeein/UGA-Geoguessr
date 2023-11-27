import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./Context/UserContext";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const { setUserData, userData } = useContext(UserContext);

	async function handleSubmit(e: any) {
		e.preventDefault();
		setLoading(true);

		if (!email || !password) {
			setError("Please enter both email and password.");
			setLoading(false);
			return;
		}

		try {
			const loginUser = { email, password };

			const loginRes = await axios.post(`${process.env.REACT_APP_BACKEND}/api/users/login`, loginUser);

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
				<>TEMP LOGIN</>
				<form
					onSubmit={(e: any) => {
						handleSubmit(e);
					}}
					autoComplete="off"
					className="flex flex-col mx-4"
				>
					<label htmlFor="email">email</label>
					<input
						className="text-black"
						id="gameName"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						className="text-black"
						id="imageURL"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{error && <div style={{ color: "red" }}>{error}</div>}

					<button className="bg-ugared-200 mt-4 hover:bg-ugared-300" type="submit" disabled={loading}>
						{loading ? "Submitting..." : "Submit"}
					</button>
					<Link to={"/signup"} className="bg-ugared-500 text-3xl mt-4 hover:bg-ugared-400" type="submit">
						Signup
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
