import mongoose, { mongo } from "mongoose";
import { userSchema } from "./user.schema.js";

const userModel = mongoose.model('User', userSchema);
export default class UserRepository {
    // function to add the user to the database if it is a new user.
    async register(data) {
        try {
            const checkDuplication = await userModel.findOne({ email: data.email });
            if (checkDuplication) {
                console.log("User already exists");
                throw new Error("User already exists");
            } else {
                const newRegistration = new userModel(data);
                await newRegistration.save();
                return newRegistration;
            }
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // Function to check if the user credentaials match with the credentials in the database. 
    async login(data) {
        try {
            const checkCredentials = await userModel.findOne({ email: data.email, password: data.password });
            if (checkCredentials) {
                return checkCredentials
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }
}