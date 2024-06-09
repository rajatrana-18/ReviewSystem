// authentication middleware to allow only logged in users to access specific routes.
const basicAuth = (req, res, next) => {
    if (req.session && req.session.userID) {
        next();
    } else {
        console.log("Login to access this page")
        // redirect to the login page in case authentication fails
        res.redirect("/api/user/login");
    }
}

export default basicAuth;