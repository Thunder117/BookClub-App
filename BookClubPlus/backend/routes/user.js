const express = require('express');

// controller functions
const { 
    getUsername, 
    searchUsers,
    signupUser, 
    loginUser 
} = require('../controllers/userController');

const router = express.Router();

// search users by username
router.get('/search', searchUsers);

// get username route
router.get('/:id', getUsername);

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);


module.exports = router;