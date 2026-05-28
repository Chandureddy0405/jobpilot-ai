const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createJob,
  getUserJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/", protect, createJob);

router.get("/", protect, getUserJobs);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

module.exports = router;