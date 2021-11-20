const checkLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        req.session.isLoggedIn = false;
        next();
    };
};

module.exports = checkLogin;