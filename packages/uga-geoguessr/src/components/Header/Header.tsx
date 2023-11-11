import { Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
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
	];

	const register = {
		name: "Register",
		href: "/Register",
	};

	const yourGames = {
		name: "Your Games",
		href: "/YourGames",
	};

	const [showDropDown, setShowDropDown] = useState(false);

	const location = useLocation();
	return (
		<header>
			<nav>
				<div
					className={`flex border-b-2 w-full border-slate-900/10 dark:border-slate-300/10 pb-2 pt-3 justify-between pl-2 pr-2 ${classes.background} hidden sm:flex`}
				>
					<div className="flex gap-x-4">
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
						<div>
							<Link
								className={`${
									location.pathname.toLocaleLowerCase() === yourGames.href.toLocaleLowerCase()
										? "   border-ugared-300"
										: " border-transparent  text-gray-300"
								} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
								to={yourGames.href}
							>{`${yourGames.name}`}</Link>
						</div>
						<div>
							<Link
								className={`${
									location.pathname.toLocaleLowerCase() === register.href.toLocaleLowerCase()
										? "   border-ugared-300"
										: " border-transparent  text-gray-300"
								} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
								to={register.href}
							>{`${register.name}`}</Link>
						</div>
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
						<>Logo Here</>
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

							<div>
								<Link
									className={`${
										location.pathname.toLocaleLowerCase() === yourGames.href.toLocaleLowerCase()
											? "   border-ugared-300"
											: " border-transparent  text-gray-300"
									} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
									to={yourGames.href}
								>{`${yourGames.name}`}</Link>
							</div>
							<div>
								<Link
									className={`${
										location.pathname.toLocaleLowerCase() === register.href.toLocaleLowerCase()
											? "   border-ugared-300"
											: " border-transparent  text-gray-300"
									} pb-[8px] pt-[6px] px-2 rounded-full border-2 text-white`}
									to={register.href}
								>{`${register.name}`}</Link>
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}
export default Header;
