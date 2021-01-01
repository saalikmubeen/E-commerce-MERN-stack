const express = require('express');
const router = new express.Router();

const User = require('../models/User');

const isLoggedIn = require("../middleware/auth");


router.get("/", async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ users: users })
    } catch (err) {
        res.json({ error: err.message })
    }
});


router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            throw new Error("Email has been taken.")
        }

        const user = await User.create({ name, email, password });

        const token = await user.generateAuthToken();

        res.json({
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token
            }
        })
    } catch (err) {
        res.json({
            error: err.message
        })
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error("Incorrect email or password");
        }

        const passwordsMatch = await user.matchPasswords(password);

        if (!passwordsMatch) {
            throw new Error("Incorrect email or password");
        }

        const token = await user.generateAuthToken();

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token
            }
        })
    } catch (err) {
        res.json({ error: err.message })
    }
});


router.get("/profile", isLoggedIn, async (req, res) => {
    res.status(200).json({
        user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin
        }
    })
})


router.put("/profile", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            res.status(404);
            throw new Error("User doesn't exist");
        }

        const { name, email, password } = req.body;

        user.name = name || user.name;
        user.email = email || user.email;
        
        if (password) {
            user.password = password;
        }

        const updatedUser = await user.save();
        const token = await updatedUser.generateAuthToken();

        res.json({
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                idAdmin: updatedUser.isAdmin,
                token: token
            }
        });
    } catch (err) {
        res.json({
            error: err.message
        })
    }
})

module.exports = router;