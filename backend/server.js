const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

app.get("/", (req, res) => res.send("Api is running..."));

const PORT = process.env.PORT || 5000;
try {
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
} catch (err) {
  console.error(err);
}
