const Job = require("../models/Job");

const asyncHandler = require("../utils/asyncHandler");

const createJob = asyncHandler(async (req, res) => {
  const {
    company,
    role,
    status,
    jobLink,
    salary,
    location,
    notes,
  } = req.body;

  if (!company || !role) {
    return res.status(400).json({
      success: false,
      message: "Company and role are required",
    });
  }

  const job = await Job.create({
    user: req.user.id,
    company,
    role,
    status,
    jobLink,
    salary,
    location,
    notes,
  });

  res.status(201).json({
    success: true,
    message: "Job application created successfully",
    job,
  });
});

const getUserJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobs.length,
    jobs,
  });
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  if (job.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to update this job",
    });
  }

  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    job: updatedJob,
  });
});

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  if (job.user.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to delete this job",
    });
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});

module.exports = {
  createJob,
  getUserJobs,
  updateJob,
  deleteJob,
};