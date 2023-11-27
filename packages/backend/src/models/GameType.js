const mongoose = require("mongoose");

const GameTypeSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String },
	url: { type: String, required: true },
	possibleCoordinates: {
		type: [
			{
				lat: { type: Number, required: true },
				lng: { type: Number, required: true },
				radius: { type: Number, required: true },
			},
		],
		validate: (array) => Array.isArray(array) && array.length > 0,
		required: true,
	},
	update_date: { type: Date, default: Date.now },
	email: {
		required: true,
		type: String,
	},
});

module.exports = GameTypes = mongoose.model("gameTypes", GameTypeSchema);
