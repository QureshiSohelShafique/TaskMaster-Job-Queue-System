const mongoose = require('mongoose');

const jobLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jobId: String,
  type: String,
  state: String,
  result: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobLog', jobLogSchema);
