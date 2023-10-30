import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			<div>Ive set up a client only demo at /ExampleGame</div>
			<Link to="/ExampleGame" className="text-purple-700">
				Example Game
			</Link>
		</div>
	);
}

export default Home;
