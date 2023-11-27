const mongoose = require("mongoose");

const leaderboardScheme = new mongoose.Schema({
	topUsers: {
		type: [
			{
				username: { required: true, type: String, trim: true },
				gamesPlayed: { type: Number, required: false, default: 0 },
				totalScore: { type: Number, required: false, default: 0 },
			},
		],
		validate: (array) => Array.isArray(array) && array.length > 0,
		required: true,
	},
});

module.exports = Leaderboard = mongoose.model("leaderboard", leaderboardScheme);
