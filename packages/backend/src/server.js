// ----------------------- CONSTANTS ----------------------- //
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const game = require("./routes/api/games");
const gameType = require("./routes/api/gameTypes");
const Games = require("./models/Game");
const User = require("./models/User");
const leaderboard = require("./routes/api/leaderboards");
const Leaderboards = require("./models/Leaderboard");
const users = require("./routes/api/users");
const cron = require("node-cron");
dotenv.config();

const app = express();
const port = 4000;
const URI = process.env.URI;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

// -------------------- Connect to Database ------------------ //
mongoose.set("strictQuery", false);
mongoose
	.connect(URI)
	.then(() => {
		console.log("Mongo Connection Suceeded...");
		deleteOldGames();
		findTopUsers();
		cron.schedule("*/30 * * * *", function () {
			deleteOldGames();
			findTopUsers();
		});
	})
	.catch((err) => {
		console.log(`Error in DB Connection ${err}`);
	});

// ------------------------Port------------------------//
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.use("/api/gameTypes", gameType);
app.use("/api/games", game);
app.use("/api/users", users);
app.use("/api/leaderboards", leaderboard);
async function deleteOldGames() {
	try {
		const TooOldTime = new Date(Date.now() - 60 * 60 * 1000);
		const oldGamesDeleted = await Games.deleteMany({
			update_date: {
				$lt: TooOldTime,
			},
		});
		if (oldGamesDeleted.deletedCount > 0) {
			console.log("Deleting old games", oldGamesDeleted);
		}
	} catch {
		console.log("could not delete old games");
	}
}

async function findTopUsers() {
	try {
		const deletedLeaderBoards = await Leaderboards.deleteMany({});
		const topUsers = await User.find({}, "username totalScore gamesPlayed").sort({ totalScore: -1 }).limit(10);
		const newArray = [];
		topUsers.forEach((x) => {
			newArray.push({ username: x.username, gamesPlayed: x.gamesPlayed, totalScore: x.totalScore });
		});
		const newLeaderboard = await Leaderboards.create({ topUsers: newArray });
		if (newLeaderboard) console.log("Updated leaderboard");
	} catch (error) {
		console.log(error.message);
	}
}
