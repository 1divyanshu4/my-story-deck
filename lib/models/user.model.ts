import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
    },
    userslug: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: String,
    portfolio: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Portfolio",
        },
    ],
    onboarded: {
        type: Boolean,
        default: false,
    },

});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;