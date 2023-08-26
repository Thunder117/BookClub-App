const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clubSchema = new Schema({
    title: {
        String,
        required: true
    },
    description: {
        String,
        required: true
    },
    books: [{ 
        bookId: String,
        bookName: String 
    }],
    members: [{ 
        userId: String,
        userName: String 
    }],
    createdBy: {
        String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);