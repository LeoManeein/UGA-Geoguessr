import express from "express";
import { gameTypes } from "./data.js"; // DUmMY GAMETYPE DATA
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
dotenv.config();
// ----------------------- CONSTANTS ----------------------- //

const app = express();
const port = 4000;
const googlemapskey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const games = []; // ARRAY OF ALL THE CURRENT GAMES

// ----------------------- ENTRY POINT ----------------------- //

app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log("Server is running on port 4000");
});

// ----------------------- APIS ----------------------- //

app.get("/api/gametype", (req, res) => {
  const result = gameTypes;

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Error no data" });
  }
});

app.get("/api/gametype/:id", (req, res) => {
  const id = req.params.id;
  const result = gameTypes.find((obj) => obj.id.toString() === id.toString());
  console.log(result);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Error no data" });
  }
});

// For creating a GAME from a GAMETYPE
app.get("/api/gametype/:id/create", async (req, res) => {
  try {
    const id = req.params.id;
    const result = gameTypes.find((obj) => obj.id.toString() === id.toString());
    const possibleCoordinates = result.possibleCoordinates;

    // Calls google maps api to get a random location
    async function getRandomAnswerLocation() {
      const randomPoint = randomPointinRadius(
        getRandomElement(possibleCoordinates)
      );

      const apiKey = googlemapskey;
      const location = `${randomPoint.lat},${randomPoint.lng}`;
      const size = "600x300";
      const radius = "1234";

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/streetview/metadata?size=${size}&location=${location}&radius=${radius}&key=${apiKey}`
      );

      const answerLocation = response.data.location;

      return answerLocation;
    }
    const numberofstages = 5;
    const answerstages = [];
    for (let i = 0; i < numberofstages; i++) {
      answerstages.push({
        score: null,
        answerLocation: await getRandomAnswerLocation(),
      });
    }
    const newGame = {
      id: generateRandomString(10),
      currentStage: 0,
      stages: answerstages,
      numberOfStages: numberofstages,
    };
    games.push(newGame);
    console.log(`---GAME ${newGame.id} CREATED---`);
    console.log(games);
    res.json(`/game/${newGame.id}`);
  } catch {
    res.json("/error");
    return;
  }
});

app.get("/api/game/:id", (req, res) => {
  const id = req.params.id;
  const result = games.find((obj) => obj.id === id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Error no data" });
  }
});

app.put("/api/game/:id", (req, res) => {
  console.log(req.method);
  console.log(req.headers);
  console.log(req.body);
  console.log(req.body.score);
  const id = req.params.id;
  const result = games.find((obj) => obj.id === id);
  console.log(req.headers["submit"]);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Error no data" });
  }
});

// ----------------------- HELPER FUNCTIONS ----------------------- //

function generateRandomString(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
function randomPointinRadius(coordinate) {
  const lat = coordinate.lat;
  const lng = coordinate.lng;
  const radius = coordinate.radius / 111111;
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radius;
  const x = lat + distance * Math.cos(angle);
  const y = lng + distance * Math.sin(angle);
  return { lat: x, lng: y };
}
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

function metersToLatLng(meters) {

}