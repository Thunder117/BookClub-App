const express = require('express');

// controller functions
const {
    getClubs,
    getClubsUser,
    addBookToClub,
    removeBookFromClub,
    createClub
} = require('../controllers/clubController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all clubs of a user
router.get('/:id', getClubsUser);

// GET all clubs
router.get('/', getClubs);

// require auth for all of the following routes ------>
router.use(requireAuth);

//DELETE a book in a club
router.delete('/:clubId/removeBook', removeBookFromClub);

//POST add a book to a club
router.post('/addBook/:clubId', addBookToClub);

// POST a new club
router.post('/', createClub);

module.exports = router;