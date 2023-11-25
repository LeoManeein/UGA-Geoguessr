const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();
const Games = require('../../models/Game');

router.get("/:id", async (req, res) => {
    try {
            const game = await Games.findById(req.params.id);
            if (game) {
                res.json(game);
            } else {
                // No game found with the given id
                res.status(404).json({ error: "Game not found" });
            }
        } catch (error) {
            // Handle potential errors, such as an invalid ObjectId
            console.error(error);
            res.status(500).json({ error: "Error fetching data" });
        }
  });
  
  router.put("/:id", async (req, res) => {
    try {
        // Using findByIdAndUpdate with async/await
        const updatedGame = await Games.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (updatedGame) {
            res.json(updatedGame);
        } else {
            // No game found with the given id
            res.status(404).json({ error: "Game not found" });
        }
    } catch (error) {
        // Handle potential errors, such as an invalid ObjectId
        console.error(error);
        res.status(500).json({ error: "Error updating the game" });
    }
  });

  router.post("/", async (req, res) => {
    try {
        const { difficulty, gameType, numberOfStages } = req.body;
        if (!numberOfStages || numberOfStages > 10) {
            throw new Error("Invalid number of stages");
        }

        const gameTypeInfo = await GameTypes.findById(gameType._id);
        if (!gameTypeInfo) {
            return res.status(404).json({ error: "GameType not found" });
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const stages = [];
        for (let i = 0; i < numberOfStages; i++) {
            const answerLocation = await getRandomAnswerLocation(gameTypeInfo.possibleCoordinates, apiKey);
            stages.push({ score: null, answerLocation });
        }

        const newGame = {
            currentStage: 0,
            stages,
            numberOfStages,
            difficulty,
            update_date: new Date()
        };

        const createdGame = await Games.create(newGame);
        console.log(`--- NEW GAME ${createdGame._id} CREATED ---`);
        res.json(`/game/${createdGame._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
        const deletedGame = await Games.findByIdAndDelete(req.params.id);

        if (deletedGame) {
            res.json({ msg: 'Game entry deleted successfully' });
        } else {
            // If no game was found and deleted
            res.status(404).json({ error: 'No such game found' });
        }
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting the game' });
        }
    });


  module.exports = router;