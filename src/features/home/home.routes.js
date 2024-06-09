import express from 'express';
import HomeController from './home.controller.js';
import basicAuth from '../middleware.js/auth.js';
// initialise the express router. 
const homeRouter = express.Router();
// creating an instance of the HomeController. 
const homeController = new HomeController();

// route to get the home page depending on the role. 
homeRouter.get("/", basicAuth, (req, res, next) => {
    homeController.displayData(req, res, next)
});

// route to post editted data of an employee
homeRouter.post("/edit", basicAuth, (req, res, next) => {
    homeController.editData(req, res, next)
});

// route to get the edit details page. 
homeRouter.get("/edit", basicAuth, (req, res, next) => {
    homeController.editData(req, res, next)
});

// route to get add new employee page 
homeRouter.get("/add", basicAuth, (req, res, next) => {
    homeController.add(req, res, next)
});

// route to post a new user to the database. 
homeRouter.post("/add", basicAuth, (req, res, next) => {
    homeController.add(req, res, next)
});

// route to get assign review page.
homeRouter.get("/assignReview", basicAuth, (req, res, next) => {
    homeController.assignReview(req, res, next)
});

// route to assign a new review on the database. 
homeRouter.post("/assignReview", basicAuth, (req, res, next) => {
    homeController.assignReview(req, res, next)
});

// route a get the page which displays all the reviews/feedbacks given to  a particular employee.
homeRouter.get("/viewReviews", basicAuth, (req, res, next) => {
    homeController.viewReviews(req, res, next)
});

// route to post a new feedback to an employee. 
homeRouter.post("/feedback", basicAuth, (req, res, next) => {
    homeController.postFeedback(req, res, next)
});


// route to delete a user from the database. 
homeRouter.delete("/delete", basicAuth, (req, res, next) => {
    homeController.deleteUser(req, res, next)
});

// route to delete a feedback given by the reviewer based on the feedback id. 
homeRouter.delete("/delete/feedback", basicAuth, (req, res, next) => {
    homeController.deleteFeedback(req, res, next)
});
export default homeRouter;