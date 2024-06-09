import UserRepository from "./user.repository.js";
export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    // function to register a new user.
    async register(req, res, next) {
        try {
            // render the register html page if it is a GET request.
            if (req.method == "GET") {
                console.log("get method hit")
                res.render("register");
            } else {
                // else, if it is POST request then register a new user in the database. 
                const data = req.body;
                const newRegistration = await this.userRepository.register(data);
                if (newRegistration) {
                    // render the login page post registration.
                    res.status(200).redirect("/api/user/login");
                } else {
                    res.status(400).send("Something went wrong with the registration");
                }
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }

    // function to login the user.
    async login(req, res, next) {
        try {
            // if it is a GET request then render the login page.
            if (req.method == "GET") {
                res.render("login");
            } else {
                // else, if it is a POST request then check if the credentials match with the ones in the database. 
                const data = req.body;
                const checkCredentials = await this.userRepository.login(data);
                //if the credentials are correct, login the user along with the user role as a query paramerter.
                if (checkCredentials) {
                    req.session.userID = checkCredentials._id;
                    const userRole = checkCredentials.role;
                    req.userRole = userRole;
                    res.status(200).redirect(`/api/home?role=${req.userRole}`); // render the user home page.
                } else {
                    res.status(400).send("Invalid login credentials");
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    // This function is used to log out the user and destroy the session.
    async logout(req, res, next) {
        try {
            req.session.destroy((err) => {
                if (err) res.status(401).send(err);
                else res.redirect("/api/user/login");
            });
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }
}