const Job = require('../models/Job');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get jobs'
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get job'
    });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      type,
      experience,
      description,
      skills
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !type ||
      !experience ||
      !description
    ) {
      return res.status(400).json({
        message: 'All required job fields must be provided'
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      type,
      experience,
      description,
      skills: skills || [],
      recruiter: req.user.id
    });

    res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create job',
      error: error.message
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized'
      });
    }

    await job.deleteOne();

    res.json({
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete job'
    });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  deleteJob
};