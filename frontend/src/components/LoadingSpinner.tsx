import MoonLoader from "react-spinners/MoonLoader";
import styles from "../Globals.module.css";
/**
 *
 * @returns A spinner to highlight something is loading
 */
const LoadingSpinner: React.FC = () => {
	return (
		<div className={`flex w-screen items-center justify-center h-screen text-white ${styles.background}`}>
			<MoonLoader color={"red"}></MoonLoader>
		</div>
	);
};

export default LoadingSpinner;
