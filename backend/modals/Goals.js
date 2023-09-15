import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    goal: {
        type: String,
        required: true,
    },
    by: {
        type: String,
        required: true,
    },
})
mongoose.model('Goal', goalSchema);