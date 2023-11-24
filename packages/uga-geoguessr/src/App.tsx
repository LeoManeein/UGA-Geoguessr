import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddGameType from "./pages/AddGame";
import AvailableGames from "./pages/AvailableGames";
import ErrorPage from "./pages/ErrorPage";
import GamePage from "./pages/GamePage";
import Home from "./pages/Home";
import RootLayout from "./pages/Root";
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

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
