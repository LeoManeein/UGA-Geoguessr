const express = require("express");
const router = express.Router();
const Leaderboards = require("../../models/Leaderboard");

const dotenv = require("dotenv");
const auth = require("../../middleware/auth");

dotenv.config();

router.get("/", async (req, res) => {
	try {
		const leadBoard = await Leaderboards.findOne();
		res.json(leadBoard);
	} catch (err) {
		res.status(404).json({ msg: "No Items Found" });
	}
});

module.exports = router;
