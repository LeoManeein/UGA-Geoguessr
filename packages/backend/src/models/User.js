const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { required: true, type: String, trim: true },
	email: { required: true, type: String, unique: true, trim: true },
	password: { required: true, type: String, minLength: 8 },
	gamesPlayed: { type: Number, required: false, default: 0 },
	totalScore: { type: Number, required: false, default: 0 },
	pastGameData: {
		type: [
			{
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
			},
		],
	},
});

module.exports = User = mongoose.model("user", userSchema);
