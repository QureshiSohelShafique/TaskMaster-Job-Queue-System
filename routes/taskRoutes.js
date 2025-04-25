const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTask, getTaskStatus, getUserJobs } = require('../controllers/taskController');

router.post('/tasks', auth, createTask);
router.get('/tasks/:id', auth, getTaskStatus);
router.get('/my-tasks', auth, getUserJobs);

module.exports = router;
