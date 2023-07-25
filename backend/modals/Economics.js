import mongoose from "mongoose";

const economicsSchema = new mongoose.Schema({
  expenses: [{
    type: Number,
  }],
  savings: [{
    type: Number,
  }],
  budgetExp: [{
    type: Number,
  }],
  budgetSave: [{
    type: Number,
  }],
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

mongoose.model('Economics', economicsSchema);