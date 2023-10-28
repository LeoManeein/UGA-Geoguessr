import { Link, useLocation } from "react-router-dom";
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
	];

	const location = useLocation();
	return (
		<header>
			<nav>
				<ul className="flex">
					{navigation.map((item, index) => {
						return (
							<li key={index}>
								<Link
									className={`${
										location.pathname.toLocaleLowerCase() === item.href.toLocaleLowerCase()
											? "bg-blue-500 text-white"
											: "text-gray-500"
									} px-4 py-2 rounded-md`}
									to={item.href}
								>{`${item.name}`}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}
export default Header;
