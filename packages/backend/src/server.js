// ----------------------- CONSTANTS ----------------------- //
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
dotenv.config({path: '../.env'});
const games = require('./routes/api/games');
app.use('/api/games',games);
const gameTypes = require('./routes/api/gameTypes');
app.use('/api/gameTypes',gameTypes);
const port = process.env.PORT || 4000; 
const URI = process.env.URI;

// -------------------- Connect to Database ------------------ //
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
mongoose.set("strictQuery", false);
mongoose
  .connect(URI)
  .then(() => {
    console.log('Mongo Connection Suceeded...');
  })
  .catch((err) => {
    console.log(`Error in DB Connection ${err}`);
  });

// ------------------------Port------------------------//
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

