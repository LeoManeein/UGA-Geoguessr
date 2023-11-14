import MoonLoader from "react-spinners/MoonLoader";
import RootLayout from "../pages/Root";
import styles from "../Globals.module.css";
const LoadingSpinner: React.FC = () => {
	return (
		<div className={`flex w-screen items-center justify-center h-screen text-white ${styles.background}`}>
			<MoonLoader color={"red"}></MoonLoader>
		</div>
	);
};

export default LoadingSpinner;
