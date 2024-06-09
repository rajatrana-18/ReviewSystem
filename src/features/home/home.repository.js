import mongoose from "mongoose";
import homeSchema from "./home.schema.js";
import { userSchema } from "../user/user.schema.js";
import { ObjectId } from "mongodb";

const homeModel = mongoose.model('Home', homeSchema);
const userModel = mongoose.model('User', userSchema);
export default class HomeRepository {

    // this function runs a query to get all the data from the user database. 
    async getAllData() {
        try {
            const users = await userModel.find();
            return users;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // this function is used to get one particular user and return it. 
    async getUserForEdit(id) {
        try {
            const user = await userModel.findOne({ _id: new ObjectId(id) });
            return user;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // this function accepts the user id and the data as parameters. 
    // used to update the user info in the user database. 
    async updateUser(id, data) {
        try {
            const updateUser = await userModel.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
            await updateUser.save();
            return updateUser;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // this function is used to delete the user from the user database. 
    // function available only with the admins.
    async deleteUser(id) {
        try {
            const user = await userModel.findOneAndDelete({ _id: new ObjectId(id) });
            return user;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // this  functionality is available only with the admin.
    // It finds a user from the user database with the matching id and checks if the same reviewer has been assigned to the reviewee. 
    // if it is a new reviewer, then add the reviewee and reviewer details to the home database. 
    async assignReview(id, data) {
        try {
            console.log(data);
            const findReviewee = await userModel.findOne({ _id: new ObjectId(id) });
            const checkDuplication = await homeModel.findOne({ revieweeId: id, reviewerId: data.nameID });
            if (checkDuplication) {
                throw new Error("review already assigned");
            } else {
                const newReview = new homeModel({
                    revieweeId: id,
                    revieweeName: findReviewee.name,
                    reviewerId: data.nameID,
                    reviewerName: data.name
                });
                await newReview.save();
                return newReview;
            }

        } catch (err) {
            throw new Error("Something went wrong");
        }
    }


    // this function is used to fetch all the pending feedbacks that are remaining with a reviewer. 
    async getPendingFeedbacks(id) {
        try {
            const getReviews = await homeModel.find({ reviewerId: id });
            return getReviews;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // this function is used to add the feedback given by the reviewer to the reviewee that has been assigned to him/her to the home database. 
    async postFeedback(id, data) {
        try {
            const review = await homeModel.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { feedback: data } },
                { new: true }
            );
            await review.save();
            return review;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // this function is used to get all the reviews that have been given to a particular employee.
    // only admin can do this .
    // filters feedbacks based on the reviewee id.
    async getReviews(id) {
        try {
            const getReviews = await homeModel.find({ revieweeId: id });
            const filteredReviews = [];
            getReviews.forEach(review => {
                if (review.feedback) {
                    filteredReviews.push(review);
                }
            });
            return filteredReviews;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // this function is used to find a feedback based on the id and delete it from the database. 
    // only admin can do this. 
    async deleteFeedback(id) {
        try {
            const feedback = await homeModel.findOneAndDelete({ _id: new ObjectId(id) });
            return feedback;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }
}