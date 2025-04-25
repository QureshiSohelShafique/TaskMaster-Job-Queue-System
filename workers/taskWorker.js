const taskQueue = require('../queues/taskQueue');
// console.log("hello")


taskQueue.process(async (job) => {
  console.log(`Processing job ${job.id} - ${job.data.type}`);

  if (job.data.type === 'email') {
    await new Promise((res) => setTimeout(res, 2000));
    return { status: 'Email sent!' };
  }

  if (job.data.type === 'image') {
    await new Promise((res) => setTimeout(res, 3000));
    return { status: 'Image processed!' };
  }

  throw new Error('Unknown task');
});
