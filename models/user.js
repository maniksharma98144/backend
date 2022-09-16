const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

// schema for user
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) throw new Error('UserID invalid.');
        },
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
});

// schema method to generate auth token for the current user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'backend', {
        expiresIn: '5m'
    });
    return token;
};

const User = mongoose.model('users', userSchema);

module.exports = User;
