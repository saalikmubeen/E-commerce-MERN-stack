const jwt = require('jsonwebtoken');
const User = require("../models/User");


const isLoggedIn = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];
        } else {
            throw new Error("You are not authorized");
        }

        if (!token) {
            throw new Error("You are not authorized");
        }

        const tokenData = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(tokenData.id).select("-password");
        if (!currentUser) {
            throw new Error("User doesn't exist");
        }

        req.user = currentUser;
        next()
    } catch (err) {
        res.status(401).json({
            error: err.message
        })
    }
}


const Admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("You are not authorized as an admin!")
    }
}


module.exports = { isLoggedIn, Admin };