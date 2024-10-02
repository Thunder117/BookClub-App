const express = require('express');

// controller functions
const { 
    getUsername, 
    searchUsers,
    signupUser, 
    loginUser 
} = require('../controllers/userController');

const router = express.Router();

// get username route
router.get('/:id', getUsername);

// Search users by username
router.get('/search', searchUsers);

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);


module.exports = router;