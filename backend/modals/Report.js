import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  report: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
});

mongoose.model("Report", reportSchema);
