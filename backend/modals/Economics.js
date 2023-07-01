import mongoose from "mongoose";

const economicsSchema = new mongoose.Schema({
  expenses: [{
    type: Number,
  }],
  savings: [{
    type: Number,
  }],
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

mongoose.model('Economics', economicsSchema);