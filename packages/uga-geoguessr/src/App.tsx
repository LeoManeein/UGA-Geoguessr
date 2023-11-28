import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddGameTypePage from "./pages/AddGameTypePage";
import AvailableGames from "./pages/AvailableGames";
import ErrorPage from "./pages/ErrorPage";
import GamePage from "./pages/GamePage";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import EditGameTypePage from "./pages/EditGameTypePage";
import axios from "axios";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import UserContext from "./components/auth/Context/UserContext";
import Profile from "./pages/Profile";
function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/AvailableGames", element: <AvailableGames /> },
				{ path: "/AddGame", element: <AddGameTypePage /> },
				{ path: "error/:id", element: <ErrorPage /> },
				{ path: "*", element: <ErrorPage /> },
				{ path: "/EditGame/:id", element: <EditGameTypePage /> },
				{ path: "/signup", element: <SignUpPage></SignUpPage> },
				{ path: "/login", element: <LoginPage></LoginPage> },
				{ path: "/profile", element: <Profile></Profile> },
			],
		},

		{
			path: "/Game/:id",
			element: <GamePage />,
		},
	]);

	// This is for the little loading progress bar you see at the top of your screen when switching pages.
	// Its similar to youtube and other fancy sites
	useEffect(() => {
		NProgress.configure({ showSpinner: false });

		router.subscribe((location) => {
			NProgress.start();
		});

		router.subscribe((location) => {
			NProgress.done();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [userData, setUserData] = useState<{ token: any; user: any }>({
		token: undefined,
		user: undefined,
	});

	async function fetchUserData() {
		try {
			let token = localStorage.getItem("auth-token");
			//console.log(token);
			if (token === null) {
				localStorage.setItem("auth-token", "");
				token = "";
			}
			const tokenResponse = await axios.post("http://localhost:4000/api/users/tokenIsValid", null, {
				headers: { "x-auth-token": token },
			});
			if (!tokenResponse) throw new Error("Couldnt not validate login");
			if (tokenResponse.data) {
				const userRes = await axios.get("http://localhost:4000/api/users/", {
					headers: { "x-auth-token": token },
				});
				setUserData({ token, user: userRes.data });
			}
		} catch (error: any) {
			console.log(error.message);
			setUserData({ token: undefined, user: undefined });
			localStorage.setItem("auth-token", "");
		}
	}
	useEffect(() => {
		fetchUserData();
	}, []);

	const [auth, setAuth] = useState({
		loading: true,
		valid: false,
	});
	useEffect(() => {
		console.log("User Data (app.tsx): ", userData);

		let token = localStorage.getItem("auth-token");
		if (!token) {
			setAuth({ loading: false, valid: false });
			return;
		}
		if (token && !userData.user) {
			setAuth({ loading: true, valid: false });
			return;
		}
		if (token && userData.token && userData.user) {
			setAuth({ loading: false, valid: true });
			return;
		}
	}, [userData]);
	return (
		<UserContext.Provider value={{ userData, setUserData, auth }}>
			<RouterProvider router={router}></RouterProvider>
		</UserContext.Provider>
	);
}

export default App;
