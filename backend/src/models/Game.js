const mongoose = require("mongoose");

const GamesSchema = new mongoose.Schema({
	currentStage: { type: Number, required: true },
	gameTypeId: { type: String },
	gameTypeTitle: { type: String },
	stages: {
		type: [
			{
				percentage: { type: Number, default: undefined },
				distance: { type: Number, default: undefined },
				score: { type: Number, default: undefined },
				answerLocation: {
					lat: { type: Number, required: true },
					lng: { type: Number, required: true },
				},
				selectedLocation: {
					lat: { type: Number, default: undefined },
					lng: { type: Number, default: undefined },
				},
			},
		],
		validate: (array) => Array.isArray(array) && array.length > 0,
		required: true,
	},
	difficulty: {
		zoom: { type: Boolean, required: true },
		compass: { type: Boolean, required: true },
		movement: { type: Boolean, required: true },
	},
	numberOfStages: { type: Number, required: true },
	update_date: { type: Date, default: Date.now },
});

module.exports = Games = mongoose.model("games", GamesSchema);
