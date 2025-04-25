const taskQueue = require('../queues/taskQueue');
const JobLog = require('../models/JobLog');

exports.createTask = async (req, res) => {
  const { type, data } = req.body;

  const job = await taskQueue.add({ type, data, userId: req.user.id });

  await JobLog.create({
    user: req.user.id,
    jobId: job.id,
    type,
    state: 'queued'
  });

  res.json({ jobId: job.id, message: 'Task added' });
};

exports.getTaskStatus = async (req, res) => {
  const job = await taskQueue.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  const state = await job.getState();
  const result = job.returnvalue;

  await JobLog.findOneAndUpdate({ jobId: job.id }, { state, result });

  res.json({ id: job.id, state, result });
};

exports.getUserJobs = async (req, res) => {
  const jobs = await JobLog.find({ user: req.user.id });
  res.json(jobs);
};
