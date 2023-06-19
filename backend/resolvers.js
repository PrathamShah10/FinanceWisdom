import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
const User = mongoose.model("User");
const Quote = mongoose.model("Quote");
export const resolvers = {
  Query: {
    users: async() => {
      return await User.find({});
    },
    user: async (_, {_id}) => {
       return User.findOne({_id: _id});
    },
    myQuote: async (_, { _id }) => {
      return await Quote.find({ by: _id });
    },
    quotes: async () => {
      return await Quote.find({}).populate('by', '_id name');
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
      const id = randomBytes(5).toString("hex");
      const hashedPassword = await bcrypt.hash(newUserDetails.password, 12);
      const newUser = await new User({
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
      return { token: token, userDetails: user };
    },

    createQuote: async (_, args, context) => {
      if (!context.userId) {
        throw new Error("User must be logged in");
      }
      const newQuote = await new Quote({
        description: args.name,
        by: context.userId,
      });
      await newQuote.save();
      return newQuote;
    },
  },
  User: {
    quote: async (parent) => {
      return await Quote.find({by: parent._id});
    },
  },
};
