import mongoose from "mongoose";
const User = mongoose.model("User");
const BusinessPerson = mongoose.model("BusinessPerson");
import { Queries } from "./query.js";
import { Mutations } from "./mutations.js";

export const resolvers = {
  Query: {
    ...Queries,
  },
  Mutation: {
    ...Mutations,
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
