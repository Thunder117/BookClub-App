const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clubSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    books: [{ 
        type: String 
    }],
    members: [{ 
        type: String 
    }],
    createdBy: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);