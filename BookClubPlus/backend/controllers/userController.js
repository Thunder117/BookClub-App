const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET);
};

// get username from user_id
const getUsername = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'});
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({error: 'No such user'});
    }

    res.status(200).json(user.username);
};

// Search users by username
const searchUsers = async (req, res) => {
    const { username } = req.query;
    console.log(req.query.username);  // To ensure the username query param is received correctly
    try {
        const users = await User.find({ username: { $regex: `^${username}`, $options: 'i' } }); // Match start of username
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({username: user.username, email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// signup user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.signup(username, email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({username, email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = { getUsername, searchUsers, signupUser, loginUser };