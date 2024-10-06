const express = require('express');

// controller functions
const {
    getClubs,
    getClubsUser,
    addBookToClub,
    removeBookFromClub,
    addMemberToClub,
    createClub,
    deleteClub
} = require('../controllers/clubController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all clubs of a user
router.get('/:id', getClubsUser);

// GET all clubs
router.get('/', getClubs);

// require auth for all of the following routes ------>
router.use(requireAuth);

// DELETE a book in a club
router.delete('/:clubId/removeBook', removeBookFromClub);

// POST add a book to a club
router.post('/addBook/:clubId', addBookToClub);

//POST add a user to a club
router.post('/clubs/addMember', addMemberToClub);

// POST a new club
router.post('/', createClub);

// DELETE a club (Add the missing route)
router.delete('/:clubId/delete', deleteClub);

module.exports = router;