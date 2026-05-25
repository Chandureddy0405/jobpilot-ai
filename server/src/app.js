require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("JobPilot AI Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});