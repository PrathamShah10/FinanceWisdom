import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = mongoose.model("User");
const Goal = mongoose.model("Goal");
const BusinessPerson = mongoose.model("BusinessPerson");
const Economics = mongoose.model("Economics");
const Chats = mongoose.model("Chats");
const Investment = mongoose.model("Investment");
const Notification = mongoose.model("Notification");

import Redis from "ioredis";
const redis = new Redis();
import { refineData } from "./common.js";
import bullmq from "bullmq";
const { Queue, Worker } = bullmq;
const notificationQueue = new Queue("notificationQueue");

export const Mutations = {
  addUser: async (_, { newUserDetails }) => {
    const alreadyUser = await User.findOne({
      username: newUserDetails.username,
    });
    if (alreadyUser) {
      throw new Error("user already exsits");
    }
    const hashedPassword = await bcrypt.hash(newUserDetails.password, 12);
    const newUser = await new User({
      ...newUserDetails,
      password: hashedPassword,
    });
    await newUser.save();
    const buisnessman = await BusinessPerson.findById(
      newUserDetails.buisnessMan
    );
    buisnessman.customers.push(newUser._id);
    await buisnessman.save();
    return newUser;
  },
  addBuisnessMan: async (_, { newUserDetails }) => {
    const alreadyUser = await BusinessPerson.findOne({
      username: newUserDetails.username,
    });
    if (alreadyUser) {
      throw new Error("user already exsits");
    }
    const hashedPassword = await bcrypt.hash(newUserDetails.password, 12);
    const newUser = await new BusinessPerson({
      ...newUserDetails,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  },
  signInUser: async (_, { signDetails }) => {
    const user = await User.findOne({ username: signDetails.username });
    if (!user) {
      throw new Error("crediantials invalid");
    }
    const equality = await bcrypt.compare(signDetails.password, user.password);
    if (!equality) {
      throw new Error("crediantials invalid");
    }
    const token = jwt.sign({ userId: user._id }, "avbdd!@#$]");
    await redis.set(
      `UserSignData_${user._id}`,
      JSON.stringify(user),
      "EX",
      432000
    ); //5 days
    return { token: token, userDetails: user, isCustomer: true };
  },
  signInBuisness: async (_, { signDetails }) => {
    const user = await BusinessPerson.findOne({
      username: signDetails.username,
    });

    if (!user) {
      throw new Error("crediantials invalid");
    }
    const equality = await bcrypt.compare(signDetails.password, user.password);
    if (!equality) {
      throw new Error("crediantials invalid");
    }
    const token = jwt.sign({ userId: user._id }, "avbdd!@#$]");
    await redis.set(`FA_data_${user._id}`, JSON.stringify(user), "EX", 432000);
    return { token: token, userDetails: user, isCustomer: false };
  },
  updateEconomics: async (_, { economicDetails }) => {
    const ecoData = await Economics.findOne({
      category: economicDetails.category,
    });
    if (!ecoData) {
      const newEcoData = await new Economics({
        expenses: economicDetails.expenses,
        by: economicDetails._id,
        category: economicDetails.category,
      });
      await newEcoData.save();
      return newEcoData;
    }
    if (economicDetails.expenses) {
      ecoData.expenses = economicDetails.expenses;
    }

    if (economicDetails.budgetExp) {
      ecoData.budgetExp = economicDetails.budgetExp;
    }
    await ecoData.save();
    return ecoData;
  },
  addMessage: async (_, { messageDetails }) => {


    // Define the sender and receiver from the first item in messageDetails
    const { sender, receiver } = messageDetails[0];
  
    // Remove all records where sender or receiver matches sender or receiver from messageDetails
    await Chats.deleteMany({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender }, // Include reverse matching
      ],
    });
  
    // Insert each message from messageDetails into the database
    const insertedMessages = await Promise.all(
      messageDetails.map(async (messageDetail) => {
        const newMessage = new Chats({ ...messageDetail });
        return await newMessage.save();
      })
    );
  
    // Find and return all records where sender is messageDetails[0].sender or receiver is messageDetails[0].receiver
    const allChats = await Chats.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender }, // Include reverse matching
      ],
    });
  
    return allChats;
  },
  changeGoals: async (_, { goalDetails }) => {
    const { goal, isAdd, userid } = goalDetails;
    const res = await User.findById(userid).populate("buisnessMan", "_id");
    if (isAdd) {
      const newGoal = await new Goal({
        goal,
        by: userid,
      });
      await newGoal.save();
      const goals = await Goal.find({ by: userid });
      const refinedData = await refineData(goals);
      notificationQueue.add("notifyBusinessPerson", {
        FAid: res.buisnessMan._id, // Replace 'X' with the actual ID
        message: `${res.name} added a new goal: ${goal}`,
      });

      return refinedData;
    } else {
      await Goal.deleteOne({ by: userid, goal });
      const goals = await Goal.find({ by: userid });
      const refinedData = await refineData(goals);

      notificationQueue.add("notifyBusinessPerson", {
        FAid: res.buisnessMan._id, // Replace 'X' with the actual ID
        message: `${res.name} removed a goal: ${goal}`,
      });

      return refinedData;
    }
  },
  addInvestment: async (_, { investDetails }) => {
    const { Itype, amount, duration, returns, customer, isAdd } = investDetails;
    if (isAdd) {
      const newInvest = await new Investment({
        Itype,
        amount,
        duration,
        returns,
        customer,
      });
      await newInvest.save();
      return await Investment.find({ customer });
    } else {
      await Investment.deleteOne({ Itype, customer });
      return await Investment.find({ customer });
    }
  },
};


const notificationWorker = new Worker("notificationQueue", async (job) => {
  const { FAid, message } = job.data;
  const notify = await new Notification({
    message,
    FAId: FAid,
  });
  await notify.save();
});