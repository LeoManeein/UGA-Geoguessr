const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const Games = require("../../models/Game");
const googlemapskey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const bcryptjs = require("bcryptjs");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Replace with a secure secret key

router.get("/:id", async (req, res) => {
	try {
		const game = await Games.findById(req.params.id);
		if (game) {
			res.json(game);
		} else {
			// No game found with the given id
			res.status(404).json({ msg: "Game not found" });
		}
	} catch (error) {
		// Handle potential errors, such as an invalid ObjectId
		res.status(500).json({ msg: "Error fetching data" });
	}
});

router.put("/:id", async (req, res) => {
	try {
		let { score, percentage, distance, selectedCoordinate, answerLocation, nextStage } = req.body;
		const foundGame = await Games.findById(req.params.id);
		if (nextStage === null) {
			nextStage = foundGame.numberOfStages;
		}
		foundGame.stages[nextStage - 1].score = score;
		foundGame.stages[nextStage - 1].selectedLocation = selectedCoordinate;

		foundGame.stages[nextStage - 1].distance = distance;
		foundGame.stages[nextStage - 1].percentage = percentage;
		let result;

		if (nextStage === foundGame.numberOfStages) {
			result = await Games.findByIdAndDelete(req.params.id);
			console.log(`GAME ${foundGame._id} FINISHED AND DELETED`);

			const token = req.header("x-auth-token");
			if (token) {
				const verified = jwt.verify(token, JWT_SECRET_KEY);
				if (verified) {
					const user = await User.findById(verified.id);

					let average = 0;
					foundGame.stages.forEach((current, index) => {
						average = average + current.score;
					});
					average = average / foundGame.numberOfStages;
					average = Math.ceil(average);
					user.totalScore = user.totalScore + average;
					user.pastGameData = user.pastGameData.push(foundGame);
					const updateUser = await User.findByIdAndUpdate(verified.id, user);
				}
			}
		} else {
			result = await Games.findByIdAndUpdate(req.params.id, foundGame);
		}

		if (result) {
			res.json(result);
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ msg: "unable to fetch gameType" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { difficulty, gameType, numberOfStages } = req.body;
		if (!numberOfStages || numberOfStages > 10) {
			throw new Error("Invalid number of stages");
		}
		let gameTypeInfo;
		if (gameType._id === "default01" || gameType._id === "default02" || gameType._id === "default03") {
			gameTypeInfo = defaultgameTypes.find((obj) => obj.id.toString() === gameType._id.toString());
		} else {
			gameTypeInfo = await GameTypes.findById(gameType._id);
		}

		if (!gameTypeInfo) {
			return res.status(404).json({ msg: "GameType not found" });
		}
		const possibleCoordinates = gameTypeInfo.possibleCoordinates;
		async function getRandomAnswerLocation() {
			const randomPoint = randomPointinRadius(getRandomElement(possibleCoordinates));

			const apiKey = googlemapskey;
			const location = `${randomPoint.lat},${randomPoint.lng}`;
			const size = "600x300";
			const radius = "1234";

			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/streetview/metadata?size=${size}&location=${location}&radius=${radius}&key=${apiKey}`,
			);

			const answerLocation = response.data.location;
			return answerLocation;
		}

		const stages = [];

		for (let i = 0; i < numberOfStages; i++) {
			stages.push({
				score: null,
				answerLocation: await getRandomAnswerLocation(),
			});
		}

		const newGame = {
			currentStage: 0,
			gameTypeId: gameType._id,
			gameTypeTitle: gameType.title,
			stages,
			numberOfStages,
			difficulty,
			update_date: new Date(),
		};

		const createdGame = await Games.create(newGame);
		const token = req.header("x-auth-token");
		if (token) {
			const verified = jwt.verify(token, JWT_SECRET_KEY);
			if (verified) {
				const user = await User.findById(verified.id);
				user.gamesPlayed = user.gamesPlayed + 1;
				const updateUser = await User.findByIdAndUpdate(verified.id, user);
			}
		}

		console.log(`--- NEW GAME ${createdGame._id} CREATED ---`);
		res.json(`/game/${createdGame._id}`);
	} catch (error) {
		//console.error(error);
		res.status(500).json({ msg: `Error: ${error.message} ` });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deletedGame = await Games.findByIdAndDelete(req.params.id);

		if (deletedGame) {
			res.json({ msg: "Game entry deleted successfully" });
		} else {
			// If no game was found and deleted
			res.status(404).json({ msg: "No such game found" });
		}
	} catch (err) {
		res.status(500).json({ msg: "Error deleting the game" });
	}
});

module.exports = router;

function randomPointinRadius(coordinate) {
	const lat = coordinate.lat;
	const lng = coordinate.lng;
	const radius = coordinate.radius / 111111;
	const angle = Math.random() * 2 * Math.PI;
	const distance = Math.random() * radius;
	const x = lat + distance * Math.cos(angle);
	const y = lng + distance * Math.sin(angle);
	return { lat: x, lng: y };
}
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const defaultgameTypes = [
	{
		id: "default01",
		title: "Entire Campus",
		default: true,
		description: "Guess your way around the entire campus",
		url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
		possibleCoordinates: [
			{ lat: 33.95653704878533, lng: -83.37458293939771, radius: 555 },
			{ lat: 33.953489107258584, lng: -83.375195362228, radius: 555 },
			{ lat: 33.95163700612744, lng: -83.37157186085528, radius: 555 },
			{ lat: 33.950250549738186, lng: -83.37672641915961, radius: 555 },
			{ lat: 33.9496790267888, lng: -83.37880610491217, radius: 555 },
			{ lat: 33.94672609710188, lng: -83.3768795250081, radius: 555 },
			{ lat: 33.94846188181118, lng: -83.37315395310254, radius: 555 },
			{ lat: 33.94391066371809, lng: -83.37261808323643, radius: 555 },
			//
			{ lat: 33.943582543233106, lng: -83.37903576350308, radius: 555 },
			{ lat: 33.941846659030695, lng: -83.3754250208728, radius: 555 },
			{ lat: 33.93925335141101, lng: -83.36924975780163, radius: 555 },
			{ lat: 33.950250549738186, lng: -83.37672641915961, radius: 555 },
			{ lat: 33.93619420538512, lng: -83.36951769270671, radius: 555 },
			{ lat: 33.932298663146135, lng: -83.37103599079649, radius: 555 },
			{ lat: 33.930723528341595, lng: -83.36572883485819, radius: 555 },
			{ lat: 33.94314434015747, lng: -83.37865364729576, radius: 555 },
		],
	},
	{
		id: "default02",
		default: true,
		title: "North Campus",
		description: "Explore the north campus!",
		url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171665469791539270/historic-4775425_1920-1800x1000.jpg?ex=655d8180&is=654b0c80&hm=45f8129baf5f522a5ac0fe64f27cf8540ad6e849039c03c6b5814ac1cfd6c662&",
		possibleCoordinates: [
			{ lat: 33.95287980662595, lng: -83.35745524110612, radius: 555 }, //
			{ lat: 33.953239747677785, lng: -83.37399022354325, radius: 555 }, //
			{ lat: 33.951779986909465, lng: -83.37433764081277, radius: 555 }, //
			{ lat: 33.95175350217092, lng: -83.37296708928022, radius: 555 }, //
		],
	},

	{
		id: "default03",
		default: true,
		title: "South Campus",
		description: "Explore South Campus with your friends",
		url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171667786343395348/woocommerce-15.jpg?ex=655d83a8&is=654b0ea8&hm=25031174744dd94b29abc8f2faff18c5d6b827899ad12db9cb6dc08bc91ed0ca&",
		possibleCoordinates: [
			{ lat: 33.937391046353824, lng: -83.3692271305832, radius: 555 }, //
			{ lat: 33.94089331098974, lng: -83.37070770419253, radius: 555 }, //
			{ lat: 33.94290486630825, lng: -83.3719093337336, radius: 555 }, //
			{ lat: 33.94356350683504, lng: -83.3756215107087, radius: 555 }, //
			{ lat: 33.94342109850432, lng: -83.37856121155025, radius: 555 }, //
			{ lat: 33.94482504467468, lng: -83.37438022993118, radius: 555 }, //
			{ lat: 33.94088394389009, lng: -83.37890297244151, radius: 555 }, //
		],
	},
];
