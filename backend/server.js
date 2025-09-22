const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.get("/echo", (req, res) => res.send("Api is running..."));

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Readiness probe wich will check the db connection
app.get('/ready', (req, res) => {
  const state = mongoose.connection.readyState;
  if (state === 1) {
    res.status(200).send('OK');
  } else {
    res.status(503).send('Not Ready');
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((err) => console.error(err));
