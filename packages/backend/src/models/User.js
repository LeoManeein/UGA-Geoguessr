const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: { required: true, type: String, trim: true },
	lastName: { required: true, type: String, trim: true },
	username: { required: true, type: String, trim: true },
	email: { required: true, type: String, unique: true, trim: true },
	password: { required: true, type: String, minLength: 8 },
	gamesPlayed: { type: Number, required: false },
	totalScore: { type: Number, required: false },
});

module.exports = User = mongoose.model("user", userSchema);
