const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});


userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    user.password = await bcrypt.hash(user.password, 12);
    next();
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 days" });
    return token;
}

userSchema.methods.matchPasswords = async function (inputPassword) {
    const user = this;

    const isMatch = await bcrypt.compare(inputPassword, user.password);
    return isMatch;
}


const User = mongoose.model('User', userSchema);

module.exports = User;