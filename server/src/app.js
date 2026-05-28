require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("JobPilot AI Backend Running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});