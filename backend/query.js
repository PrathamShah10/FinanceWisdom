import mongoose from "mongoose";
const User = mongoose.model("User");
const Goal = mongoose.model("Goal");
const BusinessPerson = mongoose.model("BusinessPerson");
const Economics = mongoose.model("Economics");
const Chats = mongoose.model("Chats");
const Investment = mongoose.model("Investment");
const Notification = mongoose.model("Notification");

const getData = (data) => {
  const refinedData = data.map((ele) => {
    return ele.goal;
  });
  return refinedData;
};

export const Queries = {
  user: async (_, { _id }) => {
    return await User.findOne({ _id: _id });
  },
  business: async (_, { _id }) => {
    return await BusinessPerson.findOne({ _id: _id });
  },
  getAllUserData: async (_, { _id }) => {
    const visuals = await Economics.find({ by: _id });
    const chats = await Chats.find({
      $or: [{ sender: _id }, { reciever: _id }],
    });
    const user = await User.findById(_id);
    return { user, visuals, chats };
  },
  getAllBusinessData: async (_, { _id }) => {
    const chats = await Chats.find({
      $or: [{ sender: _id }, { reciever: _id }],
    });

    const buisness = await BusinessPerson.findById(_id);
    return { user: buisness, chats };
  },
  getAllBusinessMen: async () => {
    return await BusinessPerson.find({});
  },
  getAllChats: async (_, { _id }) => {
    return await Chats.find({
      $or: [{ sender: _id }, { reciever: _id }],
    });
  },
  getCustomerData: async (_, { _id }) => {
    return await Economics.find({ by: _id });
  },
  getGoals: async (_, { _id }) => {
    const goals = await Goal.find({ by: _id });
    const refinedData = await getData(goals);
    return refinedData;
  },
  getInvestments: async (_, { _id }) => {
    return await Investment.find({ customer: _id });
  },
  getAllNotifications: async (_, { _id }) => {
    const notifs = await Notification.find({ FAId: _id });
    const refinedNotifications = await notifs.map((msg, i) => {
      return msg.message;
    });
    return refinedNotifications;
  },
};
