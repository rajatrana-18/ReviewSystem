import mongoose from "mongoose";
import dotenv from "dotenv";

// establishing connection with the mongoose database.
dotenv.config();
const url = "mongodb://localhost:27017/reviewSystem";
export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");
    } catch (err) {
        console.log("Error while connecting to db");
        console.log(err);
    }
}