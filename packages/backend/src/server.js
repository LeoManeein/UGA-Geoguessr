// ----------------------- CONSTANTS ----------------------- //
const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

const app = express();
const port = 4000;
const googlemapskey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const URI = process.env.MONGO_DB_STRING;
const games = []; // ARRAY OF ALL THE CURRENT GAMES
// -------------------- Connect to Database ------------------ //
app.listen(port);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

const client = new MongoClient(URI);
mongoose.set("strictQuery", false);
mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongo Connection Suceeded...");
  })
  .catch((err) => {
    console.log("Error in DB Connection ${err}");
  });
// ----------------------- ENTRY POINT ----------------------- //

// ----------------------- APIS ----------------------- //

app.get("/api/gametype", (req, res) => {
  const defaultGames = gameTypes.filter((current) => current.default === true);
  const usersGames = gameTypes.filter((current) => current.default === false);
  if (defaultGames) {
    res.json({ defaultGames: defaultGames, usersGames: usersGames });
  } else {
    res.status(404).json({ error: "Error no data" });
  }
});

app.post("/api/gametype", (req, res) => {
  try {
    const newGameType = req.body;
    if (
      !newGameType ||
      !newGameType.id ||
      !newGameType.title ||
      !newGameType.description ||
      !newGameType.url ||
      !newGameType.possibleCoordinates ||
      newGameType.possibleCoordinates.length === 0
    ) {
      throw new Error("something is wrong");
    }
    newGameType.default = false;

    // New or update?
    const result = gameTypes.find(
      (obj) => obj.id.toString() === newGameType.id.toString()
    );
    console.log(result);
    if (!result) {
      gameTypes.push(newGameType);
    } else {
      console.log("updating");
      result.title = newGameType.title;
      result.description = newGameType.description;
      result.url = newGameType.url;
      result.possibleCoordinates = newGameType.possibleCoordinates;
    }
    console.log(result);
    console.log("success adding new game type");
    res.json({ success: true });
  } catch (error) {
    console.log("post error");
    res.json({ success: false });
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

function metersToLatLng(meters) {}


const gameTypes = [
  {
    id: "231232",
    title: "Entire Campus",
    description: "Guess your way around the entire campus",
    url: "https://cdn.discordapp.com/attachments/1054239396024549486/1170214395788406855/Business-Learning-Community-1030x686.jpg?ex=65583a15&is=6545c515&hm=6b648ab2f29f1e087d178c4924f89a622fc1708e6ba93785ac6c31a64cb3fefe&",
    possibleCoordinates: [
      { lat: 33.95653704878533, lng: -83.37458293939771, radius: 0.005 },
      { lat: 33.953489107258584, lng: -83.375195362228, radius: 0.005 },
      { lat: 33.95163700612744, lng: -83.37157186085528, radius: 0.005 },
      { lat: 33.950250549738186, lng: -83.37672641915961, radius: 0.005 },
      { lat: 33.9496790267888, lng: -83.37880610491217, radius: 0.005 },
      { lat: 33.94672609710188, lng: -83.3768795250081, radius: 0.005 },
      { lat: 33.94846188181118, lng: -83.37315395310254, radius: 0.005 },
      { lat: 33.94391066371809, lng: -83.37261808323643, radius: 0.005 },
      //
      { lat: 33.943582543233106, lng: -83.37903576350308, radius: 0.005 },
      { lat: 33.941846659030695, lng: -83.3754250208728, radius: 0.005 },
      { lat: 33.93925335141101, lng: -83.36924975780163, radius: 0.005 },
      { lat: 33.950250549738186, lng: -83.37672641915961, radius: 0.005 },
      { lat: 33.93619420538512, lng: -83.36951769270671, radius: 0.005 },
      { lat: 33.932298663146135, lng: -83.37103599079649, radius: 0.005 },
      { lat: 33.930723528341595, lng: -83.36572883485819, radius: 0.005 },
      { lat: 33.94314434015747, lng: -83.37865364729576, radius: 0.005 },
    ],
  },
  {
    id: "114124",
    title: "North Campus",
    description: "Explore the north campus!",
    url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171665469791539270/historic-4775425_1920-1800x1000.jpg?ex=655d8180&is=654b0c80&hm=45f8129baf5f522a5ac0fe64f27cf8540ad6e849039c03c6b5814ac1cfd6c662&",
    possibleCoordinates: [
      { lat: 33.95287980662595, lng: -83.35745524110612, radius: 0.005 }, //
      { lat: 33.953239747677785, lng: -83.37399022354325, radius: 0.005 }, //
      { lat: 33.951779986909465, lng: -83.37433764081277, radius: 0.005 }, //
      { lat: 33.95175350217092, lng: -83.37296708928022, radius: 0.005 }, //
    ],
  },

  {
    id: "424143",
    title: "South Campus",
    description: "Explore South Campus with your friends",
    url: "https://cdn.discordapp.com/attachments/1054239396024549486/1171667786343395348/woocommerce-15.jpg?ex=655d83a8&is=654b0ea8&hm=25031174744dd94b29abc8f2faff18c5d6b827899ad12db9cb6dc08bc91ed0ca&",
    possibleCoordinates: [
      { lat: 33.937391046353824, lng: -83.3692271305832, radius: 0.005 }, //
      { lat: 33.94089331098974, lng: -83.37070770419253, radius: 0.005 }, //
      { lat: 33.94290486630825, lng: -83.3719093337336, radius: 0.005 }, //
      { lat: 33.94356350683504, lng: -83.3756215107087, radius: 0.005 }, //
      { lat: 33.94342109850432, lng: -83.37856121155025, radius: 0.005 }, //
      { lat: 33.94482504467468, lng: -83.37438022993118, radius: 0.005 }, //
      { lat: 33.94088394389009, lng: -83.37890297244151, radius: 0.005 }, //
    ],
  },
];
