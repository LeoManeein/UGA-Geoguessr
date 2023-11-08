import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ExampleGame from "./pages/ExampleGame";
import RootLayout from "./pages/Root";
import AvailableGames from "./pages/AvailableGames";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import ErrorPage from "./pages/ErrorPage";
import Game from "./pages/Game";
function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/AvailableGames", element: <AvailableGames /> },
				{ path: "error/:id", element: <ErrorPage /> },
				{ path: "*", element: <ErrorPage /> },
			],
		},
		{
			path: "/ExampleGame", // Example game is on its own part because i want it to be fullscreen and not have the footer
			element: <ExampleGame />,
		},
		{
			path: "/Game/:id",
			element: <Game />,
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
	}, []);

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
