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

import bullmq from "bullmq";
const { Queue, Worker } = bullmq;
const notificationQueue = new Queue("notificationQueue");

const getData = (data) => {
  const refinedData = data.map((ele) => {
    return ele.goal;
  });
  return refinedData;
};
export const resolvers = {
  Query: {
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
    getAllNotifications: async (_, {_id}) => {
      const notifs = await Notification.find({FAId: _id});
      const refinedNotifications = await notifs.map((msg, i) => {
        return msg.message
      });
      return refinedNotifications;
    }
  },
  Mutation: {
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
      const equality = await bcrypt.compare(
        signDetails.password,
        user.password
      );
      if (!equality) {
        throw new Error("crediantials invalid");
      }
      const token = jwt.sign({ userId: user._id }, "avbdd!@#$]");
      return { token: token, userDetails: user, isCustomer: true };
    },
    signInBuisness: async (_, { signDetails }) => {
      const user = await BusinessPerson.findOne({
        username: signDetails.username,
      });
      if (!user) {
        throw new Error("crediantials invalid");
      }
      const equality = await bcrypt.compare(
        signDetails.password,
        user.password
      );
      if (!equality) {
        throw new Error("crediantials invalid");
      }
      const token = jwt.sign({ userId: user._id }, "avbdd!@#$]");
      return { token: token, userDetails: user, isCustomer: false };
    },
    // updateEconmoics(economicDetails: EconomicsInput!): Economics
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
      const msg = await new Chats({
        ...messageDetails,
        // sender: messageDetails.sender,
        // reciever: messageDetails.reciever,
        // message: messageDetails.message,
      });
      await msg.save();
      return await Chats.find({});
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
        const refinedData = await getData(goals);

        notificationQueue.add("notifyBusinessPerson", {
          FAid: res.buisnessMan._id, // Replace 'X' with the actual ID
          message: `${res.name} added a new goal: ${goal}`,
        });

        return refinedData;
      } else {
        await Goal.deleteOne({ by: userid, goal });
        const goals = await Goal.find({ by: userid });
        const refinedData = await getData(goals);

        notificationQueue.add("notifyBusinessPerson", {
          FAid: res.buisnessMan._id, // Replace 'X' with the actual ID
          message: `${res.name} removed a goal: ${goal}`,
        });

        return refinedData;
      }
    },
    addInvestment: async (_, { investDetails }) => {
      const { Itype, amount, duration, returns, customer, isAdd } =
        investDetails;
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
  },

  BusinessPerson: {
    customers: async (buisnessMan) => {
      const res = await BusinessPerson.findById(buisnessMan._id).select(
        "customers"
      );
      const customerNames = [];

      for (const customerId of res.customers) {
        const customer = await User.findById(customerId).select(
          "_id name email username"
        );
        if (customer) {
          customerNames.push({
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            username: customer.username,
          });
        }
      }
      return customerNames;
    },
  },
  User: {
    buisnessMan: async (user) => {
      const res = await User.findById(user._id).populate(
        "buisnessMan",
        "_id name"
      );
      return res.buisnessMan;
    },
  },
  Economics: {
    by: async (eco) => {
      const res = await User.findById(eco.by).select("name email username");
      return res;
    },
  },
};

const notificationWorker = new Worker("notificationQueue", async (job) => {
  const { FAid, message } = job.data;

  // Find the BusinessPerson by ID
  const notify = await new Notification({
    message,
    FAId: FAid,
  });
  await notify.save();
});
