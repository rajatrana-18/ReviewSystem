const templateAuth = (req, res, next) => {
    res.locals.isLoggedIn = !!req.session.userID;
    next();
}

export default templateAuth;