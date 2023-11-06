import express from "express";
import { data } from "./data.js";
const app = express();
const port = 4000;

app.use(express.json());

app.get("/api/gametype/:id", (req, res) => {
  const id = req.params.id;
  const result = data[id];

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Error no data" });
  }
});

app.get("/api/gametype", (req, res) => {
  const result = data;

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Error no data" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
