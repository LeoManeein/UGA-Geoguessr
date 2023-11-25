// ----------------------- CONSTANTS ----------------------- //
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const game = require("./routes/api/games");
const gameType = require("./routes/api/gameTypes");
const Games = require("./models/Game");
dotenv.config();

const app = express();
const port = 4000;
const URI = process.env.URI;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

// -------------------- Connect to Database ------------------ //
mongoose.set("strictQuery", false);
mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongo Connection Suceeded...");
    deleteOldGames();
  })
  .catch((err) => {
    console.log(`Error in DB Connection ${err}`);
  });

// ------------------------Port------------------------//
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/gameTypes", gameType);
app.use("/api/games", game);

async function deleteOldGames() {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const testl = await Games.deleteMany({
      update_date: {
        $lt: thirtyMinutesAgo,
      },
    });
    console.log("Deleting old games", testl);
  } catch {
    console.log("could not delete old games");
  }
}
