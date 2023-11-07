import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import classes from "./Root.module.css";

const RootLayout = ({ children }: { children?: React.ReactNode }) => {
	return (
		<>
			<div className={`flex flex-col min-h-screen px-0 ${classes.background} `}>
				<Header />
				<main className={`flex-1 top-0 px-1 flex flex-col pl-0 pr-0   relative ${classes.content}`}>
					<Outlet /> {children}
				</main>
				<Footer></Footer>
			</div>
		</>
	);
};

export default RootLayout;

// "flex flex-col min-h-screen px-0 bg-neargrey-50"
//`flex-1 top-0 px-1 flex flex-col pl-0 pr-0 mt-16  relative ${classes.content}`

// og top div flex flex-col min-h-screen px-0 bg-neargrey-50
