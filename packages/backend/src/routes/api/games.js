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
let numgamesfinished = 0;
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
			numgamesfinished += 1;
			console.log(`GAME ${foundGame._id} FINISHED AND DELETED -- ${"total " + numgamesfinished}`);

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
			//console.log(foundGame);
			res.json(foundGame);
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
		if (
			gameType._id === "default01" ||
			gameType._id === "default02" ||
			gameType._id === "default03" ||
			gameType._id === "default04"
		) {
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
		numberofgamesplayed += 1;
		console.log(`--- NEW GAME ${createdGame._id} CREATED --- ${"total " + numberofgamesplayed}`);
		res.json(`/game/${createdGame._id}`);
	} catch (error) {
		res.status(500).json({ msg: `Error: ${error.message} ` });
	}
});
let numberofgamesplayed = 0;
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
		description: "Explore the north campus",
		url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171665469791539270/historic-4775425_1920-1800x1000.jpg?ex=655d8180&is=654b0c80&hm=45f8129baf5f522a5ac0fe64f27cf8540ad6e849039c03c6b5814ac1cfd6c662&",
		possibleCoordinates: [
			{ lat: 33.95294664578806, lng: -83.37509421348058, radius: 159 }, //
			{ lat: 33.95294664578806, lng: -83.37213990677068, radius: 147 }, //
			{ lat: 33.95475903997862, lng: -83.3725091951071, radius: 186 }, //
			{ lat: 33.9548611455454, lng: -83.37490956933442, radius: 187 }, //
			{ lat: 33.95616298077494, lng: -83.37386325235079, radius: 250 }, //
			{ lat: 33.950570575053284, lng: -83.3708781716133, radius: 250 }, //
			{ lat: 33.95067268564514, lng: -83.37549427584749, radius: 250 }, //
			{ lat: 33.958206644977615, lng: -83.37428224176257, radius: 250 },
			{ lat: 33.95434337792697, lng: -83.37371614403968, radius: 27 },
			{ lat: 33.95093365293073, lng: -83.37327436322403, radius: 250 },
		],
	},

	{
		id: "default03",
		default: true,
		title: "South Campus",
		description: "Explore South Campus",
		url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171667786343395348/woocommerce-15.jpg?ex=655d83a8&is=654b0ea8&hm=25031174744dd94b29abc8f2faff18c5d6b827899ad12db9cb6dc08bc91ed0ca&",
		possibleCoordinates: [
			{ lat: 33.933570506258704, lng: -83.37215807301178, radius: 250 },
			{ lat: 33.93571175198436, lng: -83.37052306099982, radius: 250 },
			{ lat: 33.93763201825496, lng: -83.37021445627855, radius: 250 },
			{ lat: 33.939833870274924, lng: -83.37055392147194, radius: 250 },
			{ lat: 33.93594218622432, lng: -83.36280794293903, radius: 124.62309682427721 },
			{ lat: 33.930353884678226, lng: -83.36475779521183, radius: 144.98376870747293 },
			{ lat: 33.9291760258372, lng: -83.36667114451066, radius: 99.29564394809037 },
			{ lat: 33.92450893040174, lng: -83.36922952496607, radius: 133.12589497415803 },
			{ lat: 33.94175677254261, lng: -83.37375878741241, radius: 250 },
			{ lat: 33.94406197206537, lng: -83.37231259786114, radius: 250 },
			{ lat: 33.94521402402256, lng: -83.37539864507389, radius: 250 },
			{ lat: 33.94646846286539, lng: -83.37438024949368, radius: 250 },
			{ lat: 33.94152740287489, lng: -83.37647876169348, radius: 250 },
			{ lat: 33.94331221557941, lng: -83.37827187545953, radius: 250 },
			{ lat: 33.94586202561466, lng: -83.37724867031216, radius: 250 },
			{ lat: 33.94043872955192, lng: -83.37376085023548, radius: 250 },
			{ lat: 33.942241808473824, lng: -83.37007146324335, radius: 167.35036594040082 },
		],
	},
	{
		id: "default04",
		default: true,
		title: "The UGA Parking Experience",
		description: "See the parking spots youll never have",
		url: "https://cdn.discordapp.com/attachments/1054239396024549486/1192546702775824565/5b7ea6f8483a0.image.jpg?ex=65a978aa&is=659703aa&hm=a0925fce7e34c1250d7f96704516fe291e232f0848776a4e3be95c3d23c27736&",
		possibleCoordinates: [
			{ lat: 33.938087490114796, lng: -83.36935958581721, radius: 114 },
			{ lat: 33.9361885759344, lng: -83.36194471735513, radius: 118 },
			{ lat: 33.933434872247474, lng: -83.3719976943281, radius: 142 },
			{ lat: 33.94126639695296, lng: -83.37910355442307, radius: 79 },
			{ lat: 33.941445429072694, lng: -83.37764525015562, radius: 82 },
			{ lat: 33.94172211433498, lng: -83.37653134028794, radius: 40 },
			{ lat: 33.94189444781422, lng: -83.37176678355839, radius: 42 },
			{ lat: 33.94212748987915, lng: -83.37257712767213, radius: 55 },
			{ lat: 33.94327327031592, lng: -83.37357271882571, radius: 50 },
			{ lat: 33.94541469740451, lng: -83.37070366911718, radius: 56 },
			{ lat: 33.9460602648484, lng: -83.37079522185844, radius: 55 },
			{ lat: 33.94455580259811, lng: -83.3714066535213, radius: 46 },
			{ lat: 33.94703894608532, lng: -83.37366000169206, radius: 34 },
			{ lat: 33.9466971796248, lng: -83.37443819992485, radius: 19 },
			{ lat: 33.943666740637674, lng: -83.37924800882142, radius: 40 },
			{ lat: 33.948639218054616, lng: -83.38154156817734, radius: 106 },
			{ lat: 33.948435399670764, lng: -83.38252437069929, radius: 114 },
			{ lat: 33.94873012253796, lng: -83.37959680355652, radius: 45 },
			{ lat: 33.950171441029006, lng: -83.3766526804705, radius: 19 },
			{ lat: 33.95019733775513, lng: -83.37703946987946, radius: 17 },
			{ lat: 33.950127251343176, lng: -83.37772722276367, radius: 62 },
			{ lat: 33.95269727862853, lng: -83.37890073065181, radius: 72 },
			{ lat: 33.956106605016714, lng: -83.37254279648862, radius: 73 },
			{ lat: 33.95524917392448, lng: -83.37184436448504, radius: 40 },
			{ lat: 33.956738765413085, lng: -83.3730298550244, radius: 52 },
			{ lat: 33.93811658941526, lng: -83.36929318213429, radius: 110 },
			{ lat: 33.93585914261665, lng: -83.36190221691228, radius: 67 },
			{ lat: 33.93037767751633, lng: -83.36586001093772, radius: 93 },
			{ lat: 33.93322895963708, lng: -83.37214403512186, radius: 107 },
			{ lat: 33.940792362571656, lng: -83.36752916195157, radius: 67 },
			{ lat: 33.93985185469944, lng: -83.36721228447567, radius: 69 },
			{ lat: 33.93913055255685, lng: -83.3679155183562, radius: 65 },
			{ lat: 33.939142421510226, lng: -83.36670042283215, radius: 52 },
			{ lat: 33.93935258798488, lng: -83.36616043949799, radius: 51 },
			{ lat: 33.9338197668977, lng: -83.37088295125416, radius: 80 },
		],
	},
];
