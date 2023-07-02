import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = mongoose.model("User");
const BusinessPerson = mongoose.model("BusinessPerson");
const Economics = mongoose.model("Economics");
const Chats = mongoose.model("Chats");
export const resolvers = {
  Query: {
    user: async (_, { _id }) => {
      return await User.findOne({ _id: _id });
    },
    business: async (_, { _id }) => {
      return await BusinessPerson.findOne({ _id: _id });
    },
    getAllUserData: async (_, { _id }) => {
      const visuals = await Economics.findOne({ by: _id });
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
      const ecoData = await Economics.findOne({ by: economicDetails._id });
      if (!ecoData) {
        const newEcoData = await new Economics({
          expenses: economicDetails.expenses,
          savings: economicDetails.savings,
          by: economicDetails._id,
        });
        await newEcoData.save();
        return newEcoData;
      }
      ecoData.expenses = economicDetails.expenses;
      ecoData.savings = economicDetails.savings;
      await ecoData.save();
      return ecoData;
    },
    addMessage: async (_, { messageDetails }) => {
      console.log("mmsg", messageDetails);
      const msg = await new Chats({
        ...messageDetails,
        // sender: messageDetails.sender,
        // reciever: messageDetails.reciever,
        // message: messageDetails.message,
      });
      await msg.save();
      return await Chats.find({});
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
        "_id name email username"
      );
      return res;
    },
  },
  Economics: {
    by: async (eco) => {
      const res = await User.findById(eco.by).select("name email username");
      return res;
    },
  },
};
