import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import UserContext from "../auth/Context/UserContext";
import exampleImage from "./SchoolIcon.png";

function Header() {
	const navigation = [
		{
			name: "Home",
			href: "/",
		},
		// {
		// 	name: "ExampleGame",
		// 	href: "/ExampleGame",
		// },
		{
			name: "Available Games",
			href: "/AvailableGames",
		},
		{
			name: "Add Game",
			href: "/addgame",
		},
	];

	const login = {
		name: "Login",
		href: "/Login",
	};

	const [showDropDown, setShowDropDown] = useState(false);
	const navigate = useNavigate();
	const [token, setToken] = useState<string | null>("");
	const { setUserData, userData } = useContext(UserContext);
	useEffect(() => {
		setToken(localStorage.getItem("auth-token"));
	}, [, userData]);

	const location = useLocation();
	return (
		<header>
			<nav>
				<div
					className={`flex border-b-2 w-full border-slate-900/10 dark:border-slate-300/10 pb-2 pt-3 justify-between pl-2 pr-2 ${classes.background} hidden sm:flex`}
				>
					<div className="flex gap-x-4">
						<Link to="/">
							<img className="w-[25px] h-[25px]" src={exampleImage}></img>
						</Link>

						{navigation.map((item, index) => {
							return (
								<div key={index}>
									<Link
										className={`${
											location.pathname.toLocaleLowerCase() === item.href.toLocaleLowerCase()
												? "   border-ugared-300"
												: " border-transparent  text-gray-300"
										} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
										to={item.href}
									>{`${item.name}`}</Link>
								</div>
							);
						})}
					</div>
					<div className="flex gap-x-4">
						{!token && (
							<div>
								<Link
									className={`${
										location.pathname.toLocaleLowerCase() === login.href.toLocaleLowerCase()
											? "   border-ugared-300"
											: " border-transparent  text-gray-300"
									} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
									to={login.href}
								>{`${login.name}`}</Link>
							</div>
						)}
						{token && (
							<div>
								<Link
									onClick={() => {
										localStorage.setItem("auth-token", "");
										navigate("/");
										setUserData({
											token: undefined,
											user: undefined,
										});
									}}
									className={`${" border-transparent  text-gray-300"} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
									to={"/"}
								>{`Logout`}</Link>
							</div>
						)}
					</div>
				</div>
				<div className="sm:hidden flex flex-col">
					<div
						className={`flex  border-b-2 w-full text-white border-slate-900/10 dark:border-slate-300/10 pb-2 pt-3 justify-between pl-2 pr-2 ${classes.background}  gap-y-4`}
					>
						<MenuUnfoldOutlined
							className="border-2 p-1 rounded-md"
							onClick={() => {
								setShowDropDown((x) => !x);
							}}
						/>
						<Link to="/">
							<div className="text-ugared-300 font-bold text-xl">UGA Geoguessr</div>
						</Link>
						<UserOutlined className="border-2 p-1 rounded-md" />
					</div>
					{showDropDown && (
						<div
							className={`flex flex-col border-b-2 w-full border-slate-900/10 dark:border-slate-300/10 pb-2 pt-3 justify-between pl-2 pr-2 ${classes.background}  gap-y-4`}
						>
							{navigation.map((item, index) => {
								return (
									<div key={index}>
										<Link
											className={`${
												location.pathname.toLocaleLowerCase() === item.href.toLocaleLowerCase()
													? "   border-ugared-300"
													: " border-transparent  text-gray-300"
											} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
											to={item.href}
										>{`${item.name}`}</Link>
									</div>
								);
							})}

							{!token && (
								<div>
									<Link
										className={`${
											location.pathname.toLocaleLowerCase() === login.href.toLocaleLowerCase()
												? "   border-ugared-300"
												: " border-transparent  text-gray-300"
										} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
										to={login.href}
									>{`${login.name}`}</Link>
								</div>
							)}
							{token && (
								<div>
									<Link
										onClick={() => {
											localStorage.setItem("auth-token", "");
											navigate("/");
											setUserData({
												token: undefined,
												user: undefined,
											});
										}}
										className={`${" border-transparent  text-gray-300"} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
										to={"/"}
									>{`Logout`}</Link>
								</div>
							)}
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}
export default Header;
