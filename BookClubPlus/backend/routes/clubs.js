const express = require('express');

// controller functions
const {
    getClubs,
    getClub,
    getClubsUser,
    createClub
} = require('../controllers/clubController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all clubs of a user
router.get('/:id', getClubsUser);

// GET all clubs
router.get('/', getClubs);

// GET a single club
//router.get('/:id', getClub);

// require auth for all of the following routes ------>
//router.use(requireAuth);

// POST a new club
router.post('/', createClub);

module.exports = router;