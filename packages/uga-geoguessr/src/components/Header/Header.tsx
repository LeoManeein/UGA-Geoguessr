import { Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";
function Header() {
	const navigation = [
		{
			name: "Home",
			href: "/",
		},
		{
			name: "ExampleGame",
			href: "/ExampleGame",
		},
		{
			name: "TestCss",
			href: "/TestCss",
		},
	];

	const location = useLocation();
	return (
		<header>
			<nav>
				<div
					className={`flex border-b-2 w-full border-slate-900/10 dark:border-slate-300/10 pb-2  ${classes.background}`}
				>
					{navigation.map((item, index) => {
						return (
							<div key={index}>
								<Link
									className={`${
										location.pathname.toLocaleLowerCase() === item.href.toLocaleLowerCase()
											? "bg-blue-500 text-white"
											: "text-gray-400"
									} px-4 py-2 rounded-md`}
									to={item.href}
								>{`${item.name}`}</Link>
							</div>
						);
					})}
				</div>
			</nav>
		</header>
	);
}
export default Header;
