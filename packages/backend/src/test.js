const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Hello world"));

const conn_str =
  "mongodb+srv://untin11:adRFkXxDaojUGNn1@cluster0.dspp9jj.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
  .connect(conn_str)
  .then(() => {
    app.listen(port);
    console.log("Connected worked");
  })
  .catch((err) => {
    console.log("error", err);
  });
