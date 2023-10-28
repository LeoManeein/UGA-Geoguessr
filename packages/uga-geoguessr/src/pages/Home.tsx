import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			<div>Hi</div>
			<Link to="/ExampleGame" className="text-purple-700">
				Example Game
			</Link>
		</div>
	);
}

export default Home;
