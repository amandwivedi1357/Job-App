const Job = require('../models/Job');

const getJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.json(jobs);
};

const createJob = async (req, res) => {
  const { companyName, position, contract, location } = req.body;
  const job = new Job({
    companyName,
    position,
    contract,
    location,
    postedBy: req.user._id,
  });

  const createdJob = await job.save();
  res.status(201).json(createdJob);
};

const updateJob = async (req, res) => {
  const { companyName, position, contract, location } = req.body;
  const job = await Job.findById(req.params.id);

  if (job) {
    job.companyName = companyName;
    job.position = position;
    job.contract = contract;
    job.location = location;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (job) {
      res.json({ message: 'Job removed' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { getJobs, createJob, updateJob, deleteJob };