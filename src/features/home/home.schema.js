import mongoose from "mongoose";
const homeSchema = new mongoose.Schema({
    revieweeId: String,
    revieweeName: String,
    reviewerId: String,
    reviewerName: String,
    feedback: String
})

export default homeSchema;