const express = require('express');

// controller functions
const {
    getReview,
    deleteReview,
    getReviews,
    getReviewsUser,
    createReview,
    addVoteReview
} = require('../controllers/reviewController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all reviews of a videogame based on videogame id
router.get('/:id', getReviews);

// GET a single review
router.get('/review/:id', getReview);

// GET all reviews of a user based on user id
router.get('/user/:id', getReviewsUser);

// require auth for all of the following routes ------>
router.use(requireAuth);

// DELETE a review
router.delete('/:id', deleteReview);

// POST a new review
router.post('/', createReview);

// POST a vote in a review
router.post('/:id', addVoteReview);

module.exports = router;