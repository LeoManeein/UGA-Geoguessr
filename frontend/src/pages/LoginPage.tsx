import styles from "../Globals.module.css";
import Banner from "../components/Header/Banner";
import Login from "../components/auth/Login";
function LoginPage() {
	return (
		<div className="mx-2 mt-6 ">
			<Banner text="Login"></Banner>
			<div
				className={` m-auto w-full sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px] h-full bg-gradient-to-r  ${styles.background} rounded-lg`}
			>
				<div
					className={`w-full text-white justify-center text-center text-6xl pb-2 font-bold ${styles.light_background} rounded-lg `}
				>
					<Login></Login>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
