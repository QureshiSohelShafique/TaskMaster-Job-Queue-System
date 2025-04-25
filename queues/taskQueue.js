const Queue = require('bull');
require('dotenv').config();

const taskQueue = new Queue('taskQueue', process.env.REDIS_URL);
module.exports = taskQueue;
