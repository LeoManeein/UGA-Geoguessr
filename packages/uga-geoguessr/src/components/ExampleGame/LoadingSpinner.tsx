import MoonLoader from "react-spinners/MoonLoader";
import RootLayout from "../../pages/Root";

const LoadingSpinner: React.FC = () => {
	return (
		<RootLayout>
			<div className="flex items-center justify-center h-screen">
				<MoonLoader></MoonLoader>
			</div>
		</RootLayout>
	);
};

export default LoadingSpinner;
