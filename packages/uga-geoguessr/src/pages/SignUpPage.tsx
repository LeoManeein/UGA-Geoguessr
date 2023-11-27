import styles from "../Globals.module.css";
import Signup from "../components/auth/Signup";
import UserContext from "../components/auth/Context/UserContext";
import { useContext } from "react";
function SignUpPage() {
	const { auth } = useContext(UserContext);
	if (auth.loading) return <div></div>;
	return (
		<div className="mx-2 mt-6 ">
			<div className={` md:m-auto w-full md:w-[768px] h-full bg-gradient-to-r  ${styles.background} rounded-lg`}>
				<div
					className={`w-full text-white justify-center text-center text-6xl pb-2 font-bold ${styles.light_background} rounded-lg `}
				>
					<Signup></Signup>
				</div>
			</div>
		</div>
	);
}

export default SignUpPage;
