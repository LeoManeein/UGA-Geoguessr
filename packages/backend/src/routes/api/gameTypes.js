const express = require("express");
const router = express.Router();
const GameTypes = require("../../models/GameType");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", async (req, res) => {
  try {
    const gameTypes = await GameTypes.find();
    res.json(gameTypes);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "No Items Found" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    await GameTypes.create(req.body);
    res.json({ success: "Item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: `Unable to add this item: ${error}` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const gameType = await GameTypes.findById(req.params.id);

    if (gameType) {
      res.json(gameType);
    } else {
      res.status(404).json({ error: "No Item Found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedGameType = await GameTypes.findByIdAndDelete(req.params.id);

    if (deletedGameType) {
      res.json({ msg: "Item Entry Deleted Successfully" });
    } else {
      // If no document was found and deleted
      res.status(404).json({ error: "No Such Item" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting the item" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await GameTypes.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (updatedItem) {
      res.json({ success: "Update Successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "unable to update gameType" });
  }
});

module.exports = router;
