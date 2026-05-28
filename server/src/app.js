const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const jobRoutes = require("./routes/jobRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jobpilot-ai-khaki.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});