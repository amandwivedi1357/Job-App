const express = require('express');
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect,admin } = require('../middleware/Authmiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getJobs)
  .post(protect, admin, createJob);

router.route('/:id')
  .put(protect, admin, updateJob)
  .delete(protect, admin, deleteJob);

module.exports = router;