import mongoose from "mongoose";

const economicsSchema = new mongoose.Schema({
  expenses: [
    {
      type: Number,
    },
  ],
  budgetExp: [
    {
      type: Number,
    },
  ],
  category: {
    type: String,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mongoose.model("Economics", economicsSchema);
