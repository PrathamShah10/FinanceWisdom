// import mongoose from "mongoose";
// import bullmq from "bullmq";
// const Notification = mongoose.model("Notification");
// const { Worker } = bullmq;
// const notificationWorker = new Worker("notificationQueue", async (job) => {
//   console.log("works!!: ", job);
//   const { FAid, message } = job.data;
//   const notify = await new Notification({
//     message,
//     FAId: FAid,
//   });
//   await notify.save();
// });
// export default notificationWorker;
