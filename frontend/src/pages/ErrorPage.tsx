import { useParams } from "react-router-dom";
import styles from "../Globals.module.css";
/**
 *
 * @returns An error page that will display the /error/:id message on the screen or a default page not found message
 */
function ErrorPage(props: any) {
	const params = useParams();
	return (
		<div className="mx-2 mt-6 ">
			<div className={` md:m-auto w-full md:w-[768px] h-full bg-gradient-to-r  ${styles.background} rounded-lg`}>
				<div
					className={`w-full text-white justify-center text-center text-6xl pb-2 font-bold ${styles.light_background} rounded-lg `}
				>
					{props.error || params.id || "Error - Page not found"}
				</div>
			</div>
		</div>
	);
}

export default ErrorPage;
