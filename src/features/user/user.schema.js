import mongoose, { Schema } from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ["Admin", "Employee"]
    },
    password: String
})