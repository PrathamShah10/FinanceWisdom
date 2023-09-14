import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    FAId: {
        type: String,
        required: true,
    },
});
mongoose.model('Notification', notificationSchema);