const Review = require('../models/reviewModel');
const mongoose = require('mongoose');

// adds a vote to a review
const addVoteReview = async (req, res) => {
    const {username, vote} = req.body;
    const {id} = req.params;
    const user_id = req.user._id;

    const currentVote = {user_id:user_id, username:username, vote:vote};

    const review = await Review.findById(id);

    let voteExists = false;
    let previousVoteValue = '';
    let previousVoteIndex = '';
    let previousVoteId = '';
    for(let i = 0; i < review.votes.length; i++) {
        // if a vote exists
        if (review.votes[i].user_id == user_id) {
            voteExists = true;
            previousVoteValue = review.votes[i].vote;
            previousVoteIndex = i;
            previousVoteId = review.votes[i]._id;
        }
    }

    if (voteExists) {

        //if the vote that exists is already the same value, then pull 
        if (previousVoteValue == vote) {

            review.votes.pull({ _id: review.votes[previousVoteIndex] });
        
        } else {

            review.votes.pull({ _id: review.votes[previousVoteIndex] });
            review.votes.push(currentVote);

        }

    } else {

        // if there is not a vote already
        review.votes.push(currentVote);
        
    }

    review.save();
    res.status(200).json(review);
};

// get all reviews of a game with the game id
const getReviews = async (req, res) => {
    const {id} = req.params;

    const reviews = await Review.find({ game_id: id}).sort({createdAt: -1});

    res.status(200).json(reviews);
};

// get all reviews of a user with the user id
const getReviewsUser = async (req, res) => {
    const {id} = req.params;

    const reviews = await Review.find({ username: id}).sort({createdAt: -1});

    res.status(200).json(reviews);
};

// delete a revire
const deleteReview = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such review'});
    }

    const review = await Review.findOneAndDelete({_id: id});

    if (!review) {
        return res.status(404).json({error: 'No such review'});
    }
    
    res.status(200).json(review);
};

// get a review with the review id
const getReview = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such review'});
    }

    const review = await Review.findById(id);

    if (!review) {
        return res.status(404).json({error: 'No such review'});
    }

    res.status(200).json(review);
};

// create a new review
const createReview = async (req, res) => {
    const { game_id, username, gamename, title, description, rating  } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!description) {
        emptyFields.push('description');
    }
    if (!rating) {
        emptyFields.push('rating');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields });
    }
    
    const create = async (exists, user_id) => {
        if(exists == '') {
            const review = await Review.create({ user_id, username, gamename, game_id, title, description, rating });
            res.status(200).json(review);
        } else {
            console.log(exists);
            res.status(400).json({error: `A review with this user already exists`, emptyFields });
        }
    };

    // add doc to db
    try {
        const user_id = req.user._id;
        const exists = await Review.find({ user_id, game_id });
        await create(exists, user_id);
    } catch (error) {
        res.status(400).json({error: `${error.message}`, emptyFields});
    }
    
};

module.exports = {
    deleteReview,
    addVoteReview,
    getReview,
    getReviews,
    getReviewsUser,
    createReview
};