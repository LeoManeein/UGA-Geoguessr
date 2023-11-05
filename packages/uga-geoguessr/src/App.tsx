import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ExampleGame from "./pages/ExampleGame";
import RootLayout from "./pages/Root";
import TestCss from "./pages/TestCss";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/TestCss", element: <TestCss /> },
			],
		},
		{
			path: "/ExampleGame", // Example game is on its own part because i want it to be fullscreen and not have the footer
			element: <ExampleGame />,
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
