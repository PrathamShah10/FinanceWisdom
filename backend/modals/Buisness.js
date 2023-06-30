import mongoose from "mongoose";

const businessPersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
})
mongoose.model('BusinessPerson', businessPersonSchema);