const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videogameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    launchDate: {
        type: String,
        required: true
    },
    genre: [{ 
        type: String 
    }],
    franchise: {
        type: String,
        required: false
    },
    developer: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    trailerPath: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Videogame', videogameSchema);