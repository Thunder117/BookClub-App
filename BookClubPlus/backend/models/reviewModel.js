const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewModelSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    game_id: {
        type: String,
        required: true
    },
    gamename: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    votes: [{ 
        user_id: String,
        username: String,
        vote: Boolean
    }],
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewModelSchema);