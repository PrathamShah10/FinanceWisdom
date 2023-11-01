import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
});
mongoose.model("Investment", investmentSchema);
