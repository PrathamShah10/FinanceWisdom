import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
});

// indexing to improve performance:
// chatsSchema.index({ sender: 1 });
// chatsSchema.index({ receiver: 1 });

mongoose.model('Chats', chatsSchema);