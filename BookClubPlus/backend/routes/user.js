const express = require('express');

// controller functions
const { getUsername, signupUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// get username route
router.get('/:id', getUsername);

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);


module.exports = router;