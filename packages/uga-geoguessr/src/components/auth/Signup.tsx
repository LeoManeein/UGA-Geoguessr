import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./Context/UserContext";

const Signup: React.FC = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { setUserData } = useContext(UserContext);
	async function handleSubmit(e: any) {
		e.preventDefault();
		setLoading(true);

		if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
			setError("Please fill in all fields.");
			setLoading(false);
			return;
		}

		// Validating email
		const validateEmail = (email: string): boolean => {
			return (
				String(email)
					.toLowerCase()
					.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					) !== null
			);
		};
		if (!validateEmail(email)) {
			setError("Please enter valid email");
			setLoading(false);
			return;
		}

		// Validating password
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
		const hasUppercase = /[A-Z]/.test(password);
		const isLengthValid = password.length >= 8;

		if (!hasSpecialChar || !hasUppercase || !isLengthValid) {
			let errorMessage = "Password must ";
			if (!hasSpecialChar) errorMessage += "contain a special character, ";
			if (!hasUppercase) errorMessage += "contain an uppercase letter, ";
			if (!isLengthValid) errorMessage += "be at least 8 characters long, ";

			errorMessage = errorMessage.slice(0, -2); // Remove the trailing comma and space

			setError(errorMessage);
			setLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			setLoading(false);
			return;
		}

		try {
			const newUser = { firstName, lastName, email, password, confirmPassword, username };

			await axios.post(`${process.env.REACT_APP_BACKEND}/api/users/signup`, newUser);
			const loginRes = await axios.post(`${process.env.REACT_APP_BACKEND}/api/users/login`, {
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
		<div className="flex m-auto justify-center   ">
			<div className="input w-full  text-lg">
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
					autoComplete="off"
					className="flex flex-col mx-4"
				>
					<label htmlFor="firstName">First Name</label>
					<input
						className="text-black"
						id="firstName"
						type="text"
						required
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<label htmlFor="lastName">Last Name</label>
					<input
						className="text-black"
						id="lastName"
						type="text"
						required
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<label htmlFor="email">Email</label>
					<input
						className="text-black"
						id="email"
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
					<label htmlFor="password">Confirm Password</label>
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
						{loading ? "Submitting..." : "Submit"}
					</button>
					<Link to={"/login"} className="bg-ugared-500 mt-4 hover:bg-ugared-400" type="submit">
						Already have an account? Login
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Signup;
