import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import classes from "./Root.module.css";
function RootLayout() {
	return (
		<>
			<div className="flex flex-col min-h-screen px-0 bg-neargrey-50">
				<Header />
				<main className={`flex-1 top-0 px-1 flex flex-col pl-0 pr-0 mt-16  relative ${classes.content}`}>
					<Outlet />
				</main>
				<Footer></Footer>
			</div>
		</>
	);
}

export default RootLayout;
