import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema({
    sender: String,
    reciever: String,
    message: String,
});

mongoose.model('Chats', chatsSchema);