import HomeRepository from "./home.repository.js";
import UserRepository from "../user/user.repository.js";

export default class HomeController {
    constructor() {
        this.homeRepository = new HomeRepository();
        this.userRepository = new UserRepository();
    }

    // this funtion is used to display the home page based on the user role whether it an Admin or an Employee.
    // The role is present as a query parameter in the url.s
    async displayData(req, res, next) {
        try {
            const role = req.query.role;
            // if role is an admin, get all the details of the all the users and render the home page with all those details.
            if (role == "Admin") {
                const getAllData = await this.homeRepository.getAllData();
                res.render("homeAdmin", { getAllData });
            } else {
                // if the role is an employee, get the user id from the session. 
                // get all the details of that particular employee like the reviews that have been assigned to that particualr employee.
                // render the home page based on the user.. 
                const id = req.session.userID;
                const getPendingReviews = await this.homeRepository.getPendingFeedbacks(id);
                res.render("homeEmployee", { getPendingReviews });
            }
        } catch (err) {
            res.status(400).send("Something went wrong loading the home page");
        }
    }

    // this function is available only to the Admins.
    // This allows them to edit employee info like name, email and role.
    // Render the edit.ejs file if it is a GET request.
    // Otherwise, update the user info in the database based on the user id and the data modified. 
    async editData(req, res, next) {
        try {
            console.log("edit data: " + req.session.userID);
            const userId = req.query.id;
            if (req.method == "GET") {
                const getUser = await this.homeRepository.getUserForEdit(userId);
                res.render("edit", { getUser });
            } else {
                const data = req.body;
                const updateData = await this.homeRepository.updateUser(userId, data);
                res.redirect("/api/home?role=Admin");
            }
        } catch (err) {
            res.status(400).send("Something went wrong loading the home page");
        }
    }

    // This function is used to remove a particular employee from the database. 
    // Feature available only to admins. 
    // User deleted based on the user id passed as a query parameter. 
    async deleteUser(req, res, next) {
        try {
            console.log("method is : " + req.method)
            if (req.method == "DELETE") {
                const userId = req.query.id;
                const user = await this.homeRepository.deleteUser(userId);
                // res.redirect("/api/home?role=Admin")
                res.status(204).send();
            }

        } catch (err) {
            res.status(400).send("Something went wrong loading the home page");
        }
    }

    // This function is used to add a new user.
    // Feature available only to the Admins. 
    // If it is GET request, render the "addEmployee.ejs" file
    // else, register a new user using the name, email, role and password of the employee.
    async add(req, res, next) {
        try {
            if (req.method == "GET") {
                res.render("addEmployee");
            } else {
                const data = req.body;
                const newRegistration = await this.userRepository.register(data);
                if (newRegistration) {
                    res.status(200).redirect("/api/home?role=Admin");
                } else {
                    res.status(400).send("Something went wrong with the registration");
                }
            }
        } catch (err) {
            res.status(400).send("Something went wrong loading the home page");
        }
    }

    // This feature is used to assign a reviewer to a reviewee.
    // Feature availale only to the Admins. 
    // render the "assignReview.ejs" file if it is a GET request.
    // Otherwise, assign a reviewer. 
    async assignReview(req, res, next) {
        try {
            const userId = req.query.id;
            if (req.method == "GET") {
                const getData = await this.homeRepository.getAllData();
                res.render("assignReview", { getData, userId });
            } else {
                const data = req.body;
                const newReview = await this.homeRepository.assignReview(userId, data);
                if (newReview) {
                    res.redirect("/api/home?role=Admin")
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong loading the home page");
        }
    }

    // This function is used to post a feedback
    // Basically available to all the reviewers to give feedback to the reviewee that has been assigned to them.
    async postFeedback(req, res, next) {
        try {
            const feedbackId = req.query.id;
            const { feedback } = req.body;
            const newFeedback = await this.homeRepository.postFeedback(feedbackId, feedback);
            res.send();
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong loading the home page");
        }
    }


    // This funtion is used to view all the feedbacks that have been given by the reviewers to a particualr employee.
    // this function will render the "viewReviews.ejs" file which contains all the reviews/feedbacks that have been given by various reviewwers to a single employee.
    // feature available only to the Admins.
    async viewReviews(req, res, next) {
        try {
            const id = req.query.id;
            const reviews = await this.homeRepository.getReviews(id);
            if (reviews) {
                res.render("viewReviews", { reviews });
            } else {
                res.send("NO feedbacks found")
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong loading the home page");
        }
    }


    // This funtion is used to delete a particular feedback that has been given by the reviewer to an employee. 
    // feature available only to the Admins. 
    // feedback deleted based on the feedback id that has been sent to them.
    async deleteFeedback(req, res, next) {
        try {
            const id = req.query.id;
            const feedback = await this.homeRepository.deleteFeedback(id);
            res.send();
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong loading the home page");
        }
    }
}