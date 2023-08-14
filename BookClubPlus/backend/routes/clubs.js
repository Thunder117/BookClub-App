const express = require('express');

// controller functions
const {
    getClubs,
    getClub,
    createClub
} = require('../controllers/clubController');

const router = express.Router();

// GET all clubs
router.get('/', getClubs);

// GET a single club
router.get('/:id', getClub);

// POST a new club
router.post('/', createClub);

module.exports = router;