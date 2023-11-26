import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddGameType from "./pages/AddGame";
import AvailableGames from "./pages/AvailableGames";
import ErrorPage from "./pages/ErrorPage";
import GamePage from "./pages/GamePage";
import Home from "./pages/Home";
import RootLayout from "./pages/Root";
import EditGameType from "./pages/EditGame";
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
				{ path: "/AddGame", element: <AddGameType /> },
				{ path: "error/:id", element: <ErrorPage /> },
				{ path: "*", element: <ErrorPage /> },
				{ path: "/EditGame/:id", element: <EditGameType /> },
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

	useEffect(() => {
		try {
			const checkLoggedIn = async () => {
				let token = localStorage.getItem("auth-token");
				//console.log(token);
				if (token === null) {
					localStorage.setItem("auth-token", "");
					token = "";
				}
				const tokenResponse = await axios.post("http://localhost:4000/api/users/tokenIsValid", null, {
					headers: { "x-auth-token": token },
				});
				//console.log(tokenResponse.data);

				if (tokenResponse.data) {
					const userRes = await axios.get("http://localhost:4000/api/users/", {
						headers: { "x-auth-token": token },
					});
					setUserData({ token, user: userRes.data });
					//console.log(userRes.data);
					//console.log(tokenResponse.data);
				}
			};
			checkLoggedIn();
		} catch (error: any) {
			console.log(error.message);
		}
	}, []);

	useEffect(() => {
		//	console.log(userData);
	}, [userData]);

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			<RouterProvider router={router}></RouterProvider>
		</UserContext.Provider>
	);
}

export default App;
