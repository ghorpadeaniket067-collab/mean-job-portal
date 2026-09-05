const express = require('express');

const {
  getJobs,
  getJobById,
  createJob,
  deleteJob
} = require('../controllers/jobController');

const authMiddleware = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);

router.post(
  '/',
  authMiddleware,
  allowRoles('Recruiter'),
  createJob
);

router.delete(
  '/:id',
  authMiddleware,
  allowRoles('Recruiter'),
  deleteJob
);

module.exports = router;