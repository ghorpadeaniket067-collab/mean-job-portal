const express = require('express');

const {
  applyForJob,
  getMyApplications,
  getApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');

const authMiddleware = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  allowRoles('Job Seeker'),
  applyForJob
);

router.get(
  '/my',
  authMiddleware,
  allowRoles('Job Seeker'),
  getMyApplications
);

router.get(
  '/',
  authMiddleware,
  allowRoles('Recruiter'),
  getApplications
);

router.patch(
  '/:id/status',
  authMiddleware,
  allowRoles('Recruiter'),
  updateApplicationStatus
);

module.exports = router;
