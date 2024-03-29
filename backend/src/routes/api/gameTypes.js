const express = require("express");
const router = express.Router();
const GameTypes = require("../../models/GameType");
const dotenv = require("dotenv");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
dotenv.config();

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user);
		if (!user) {
			return res.status(500).json([]);
		}
		const gameTypes = await GameTypes.find({ email: user.email });
		res.json(gameTypes);
	} catch (err) {
		res.status(404).json({ msg: "No Items Found" });
	}
});

router.post("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user);
		if (!user) {
			return res.status(500).json({ msg: "Must be authenticated" });
		}
		const newGameType = req.body;
		newGameType.email = user.email;
		await GameTypes.create(newGameType);
		res.json({ success: "Item added successfully" });
	} catch (error) {
		res.status(400).json({ msg: `Unable to add this item: ${error}` });
	}
});

router.get("/:id", auth, async (req, res) => {
	try {
		const gameType = await GameTypes.findById(req.params.id);
		const user = await User.findById(req.user);
		if (!user) {
			return res.status(500).json({ msg: "must send auth token" });
		}
		if (user.email !== gameType.email) throw new Error("GameType not found");

		if (gameType) {
			res.json(gameType);
		} else {
			res.status(404).json({ msg: "No Item Found" });
		}
	} catch (err) {
		res.status(500).json({ msg: `Error fetching data: ${err.message}` });
	}
});

router.delete("/:id", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user);
		if (!user) {
			return res.status(500).json({ msg: "must send auth token" });
		}

		const deletedGameType = await GameTypes.findOneAndDelete({
			_id: req.params.id,
			email: user.email,
		});

		if (deletedGameType) {
			res.json({ msg: "Item Entry Deleted Successfully" });
		} else {
			// If no document was found and deleted
			res.status(404).json({ msg: "No Such Item" });
		}
	} catch (err) {
		res.status(500).json({ msg: "Error deleting the item" });
	}
});

router.put("/:id", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user);
		if (!user) {
			return res.status(500).json({ msg: "must send auth token" });
		}

		const verifyItem = await GameTypes.findById(req.params.id);
		if (verifyItem.email != user.email) throw new Error("Wrong email");
		const updatedItem = await GameTypes.findByIdAndUpdate(req.params.id, req.body);

		if (updatedItem) {
			res.json({ success: "Update Successfully" });
		}
	} catch (error) {
		res.status(400).json({ msg: `unable to update gameType: ${error.message}` });
	}
});

module.exports = router;
