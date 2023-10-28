import { Link, useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  const navigation = [
    {
      name: "Home",
      href: "/",
      current: useLocation().pathname == "/" ? true : false,
    },
    {
      name: "ExampleGame",
      href: "/ExampleGame",
      current: useLocation().pathname == "/ExampleGame" ? true : false,
    },
  ];

  return (
    <header>
      <nav>
        <ul className="flex">
          {navigation.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={`${
                    item.current ? "bg-blue-500 text-white" : "text-gray-500"
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
