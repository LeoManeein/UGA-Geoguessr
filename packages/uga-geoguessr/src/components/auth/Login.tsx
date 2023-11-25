import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./Context/UserContext";
type LatLngLiteral = google.maps.LatLngLiteral;

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const { setUserData } = useContext(UserContext);

	async function handleSubmit(e: any) {
		e.preventDefault();
		setLoading(true);
		try {
			const loginUser = { email, password };

			const loginRes = await axios.post("http://localhost:4000/api/users/login", loginUser);

			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});

			localStorage.setItem("auth-token", loginRes.data.token);
			setLoading(false);
			navigate("/");
		} catch (error: any) {
			setLoading(false);
			error.response.data.msg && setError(error.response.data.msg);
		}
	}
	return (
		<div className="flex m-auto justify-center  ">
			<div className="input w-1/2 sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px] ">
				<form
					onSubmit={(e: any) => {
						handleSubmit(e);
					}}
					autoComplete="off"
					className="flex flex-col mr-6"
				>
					<label>email</label>
					<input
						className="text-black"
						id="gameName"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<input
						className="text-black"
						id="imageURL"
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{error && <div style={{ color: "red" }}>{error}</div>}

					<button className="bg-ugared-200 mt-4 hover:bg-ugared-300" type="submit">
						Submit
					</button>
					<Link to={"/signup"} className="bg-ugared-500 mt-4 hover:bg-ugared-400" type="submit">
						Sign Up
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
