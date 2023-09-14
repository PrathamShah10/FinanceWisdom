import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
    Itype: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    returns: {
        type: String,
        required: true,
    },
    customer: {
        type: String,
        required: true,
    },
})
mongoose.model('Investment', investmentSchema);