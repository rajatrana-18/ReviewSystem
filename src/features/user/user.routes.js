import express from 'express';
import UserController from './user.controller.js';
//initialise express router.
const userRouter = express.Router();
// create an instance of the UserController class.
const userController = new UserController();

// Routes to display and handle various requests. 

// To get the registration page
userRouter.get("/register", (req, res, next) => {
    userController.register(req, res, next)
});

// TO register a new user.
userRouter.post("/register", (req, res, next) => {
    userController.register(req, res, next)
});

// to get the login page.
userRouter.get("/login", (req, res, next) => {
    userController.login(req, res, next)
});

// to send login request to the server.
userRouter.post("/login", (req, res, next) => {
    userController.login(req, res, next)
});

// to log out a user by destroying session.
userRouter.get("/logout", (req, res, next) => {
    userController.logout(req, res, next)
});




export default userRouter; 