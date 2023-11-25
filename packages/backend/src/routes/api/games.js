const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();
const Games = require('../../models/Games');

router.get("/:id", async (req, res) => {
    try{
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

  function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function getRandomCoordinates() {
    const minLat = -90;
    const maxLat = 90;
    const minLng = -180;
    const maxLng = 180;

    const latitude = Math.random() * (maxLat - minLat) + minLat;
    const longitude = Math.random() * (maxLng - minLng) + minLng;

    return { lat: latitude, lng: longitude };
}

function randomPointInRadius(center, radius) {
    const radiusInDegrees = radius / 111300; // Convert radius from meters to degrees
    const u = Math.random();
    const v = Math.random();
    const w = radiusInDegrees * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    // Adjust the x-coordinate for the shrinking of the east-west distances
    const new_x = x / Math.cos(center.lat);

    const foundLongitude = new_x + center.lng;
    const foundLatitude = y + center.lat;

    return { lat: foundLatitude, lng: foundLongitude };
}

  module.exports = router;