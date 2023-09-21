import mongoose from "mongoose";
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

export const Queries = {
  user: async (_, { _id }) => {
    const cachedUser = await redis.get(`User_${_id}`);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }
    const userData = await User.findOne({ _id: _id });
    await redis.set(`User_${_id}`, JSON.stringify(FAData), "EX", 432000);
    return userData;
  },
  business: async (_, { _id }) => {
    const cachedFA = await redis.get(`FA_${_id}`);
    if (cachedFA) {
      return JSON.parse(cachedFA);
    }
    const FAData = await BusinessPerson.findOne({ _id: _id });
    await redis.set(`FA_${_id}`, JSON.stringify(FAData), "EX", 432000);
    return FAData;
  },
  getAllUserData: async (_, { _id }) => {
    if (!_id) return null;
    const cachedUserData = await redis.get(`UserSignData_${_id}`);
    let user = null;
    if (cachedUserData) {
      user = JSON.parse(cachedUserData);
    } else {
      user = await User.findById(_id);
      await redis.set(
        `UserSignData_${_id}`,
        JSON.stringify(user),
        "EX",
        432000 //5 days
      );
    }
    const visuals = await Economics.find({ by: _id });
    const chats = await Chats.find({
      $or: [{ sender: _id }, { receiver: _id }],
    });
    const allUserData = { user, visuals, chats };

    return allUserData;
  },
  getAllBusinessData: async (_, { _id }) => {
    const cachedAllFinancialAdvisorsData = await redis.get(`FA_data_${_id}`);
    let FA = null;
    if (cachedAllFinancialAdvisorsData) {
      FA = JSON.parse(cachedAllFinancialAdvisorsData);
    } else {
      FA = await BusinessPerson.findById(_id);
    }
    const chats = await Chats.find({
      $or: [{ sender: _id }, { receiver: _id }],
    });
    const FA_Data = { user: FA, chats };
    await redis.set(`FA_data_${_id}`, JSON.stringify(FA), "EX", 3600);
    return FA_Data;
  },
  getAllBusinessMen: async () => {
    const cachedFinancialAdvisorsData = await redis.get("allBusinessMen");
    if (cachedFinancialAdvisorsData) {
      return JSON.parse(cachedFinancialAdvisorsData);
    }
    const businessMen = await BusinessPerson.find({});
    await redis.set("allBusinessMen", JSON.stringify(businessMen), "EX", 3600);
    return businessMen;
  },
  getAllChats: async (_, { _id }) => {
    return await Chats.find({
      $or: [{ sender: _id }, { receiver: _id }],
    });
  },
  getCustomerData: async (_, { _id }) => {
    return await Economics.find({ by: _id });
  },
  getGoals: async (_, { _id }) => {
    const goals = await Goal.find({ by: _id });
    const refinedGoalsData = await refineData(goals);
    return refinedGoalsData;
  },
  getInvestments: async (_, { _id }) => {
    const allInvsetments = await Investment.find({ customer: _id });
    return allInvsetments;
  },
  getAllNotifications: async (_, { _id }) => {
    const cachedNotifications = await redis.get(`notification${_id}`);
    if (cachedNotifications) {
      return JSON.parse(cachedNotifications);
    }
    const notificationsFromDatabase = await Notification.find({ FAId: _id });
    const refinedNotifications = notificationsFromDatabase.map((msg, i) => {
      return msg.message;
    });
    refinedNotifications.reverse();
    await redis.set(
      `notification${_id}`,
      JSON.stringify(refinedNotifications),
      "EX",
      600 //10 minutes
    );
    return refinedNotifications;
  },
};
