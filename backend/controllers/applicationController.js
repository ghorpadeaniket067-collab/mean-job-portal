const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        message: 'Job ID is required'
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      candidate: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'Already applied for this job'
      });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user.id
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Apply error:', error);

    res.status(500).json({
      message: 'Failed to submit application',
      error: error.message
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');

    const applications = await Application.find({
      candidate: req.user.id
    })
      .populate(
        'job',
        'title company location salary type experience description skills'
      )
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error('Get my applications error:', error);

    res.status(500).json({
      message: 'Failed to get applications',
      error: error.message
    });
  }
};

const getApplications = async (req, res) => {
  try {
    console.log('RECRUITER ID:', req.user.id);

    const jobs = await Job.find({
      recruiter: req.user.id
    }).select('_id');

    console.log('RECRUITER JOBS:', jobs);

    const jobIds = jobs.map((job) => job._id);

    console.log('JOB IDS:', jobIds);

    const applications = await Application.find({
      job: { $in: jobIds }
    })
      .populate('job')
      .populate('candidate', 'name email')
      .sort({ createdAt: -1 });

    console.log('RECRUITER APPLICATIONS:', applications);

    res.status(200).json(applications);
  } catch (error) {
    console.error('Get applications error:', error);

    res.status(500).json({
      message: 'Failed to get applications',
      error: error.message
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: 'Status is required'
      });
    }

    const application = await Application.findById(req.params.id)
      .populate('job');

    if (!application) {
      return res.status(404).json({
        message: 'Application not found'
      });
    }

    if (application.job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized'
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      message: 'Application status updated',
      application
    });
  } catch (error) {
    console.error('Update application status error:', error);

    res.status(500).json({
      message: 'Failed to update application'
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getApplications,
  updateApplicationStatus
};