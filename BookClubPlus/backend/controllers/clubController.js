const Club = require('../models/clubModel');
const mongoose = require('mongoose');

// get all clubs
const getClubs = async (req, res) => {
    const clubs = await Club.find({}).sort({createdAt: -1});

    res.status(200).json(clubs);
};

// Get all clubs of a user using the user's username
const getClubsUser = async (req, res) => {
    const {id} = req.params;

    const clubs = await Club.find( {members: {$elemMatch: {userName: id}}} ).sort({createdAt: -1});

    res.status(200).json(clubs);
};

const addBookToClub = async (req, res) => {
    const { clubId } = req.params; // Get the club ID from the request parameters
    const { bookId, bookTitle, bookImage } = req.body; // Get book details from the request body

    try {
        // Update the club by adding the book details to its books array
        const club = await Club.findByIdAndUpdate(
            clubId,
            { $addToSet: { books: { bookId, bookTitle, bookImage } } }, // Add the book with details
            { new: true }
        );

        if (!club) {
            return res.status(404).json({ error: 'Club not found' });
        }

        res.status(200).json(club);
    } catch (error) {
        res.status(400).json({ error: `${error.message}` });
    }
};

const removeBookFromClub = async (req, res) => {
    const { clubId } = req.params; // Get the club ID from params
    const { bookId } = req.body;   // Get the book ID from the request body

    try {
        const club = await Club.findByIdAndUpdate(
            clubId,
            { $pull: { books: { bookId } } }, // Remove the book from the club's books array
            { new: true }
        );

        if (!club) {
            return res.status(404).json({ error: 'Club not found' });
        }

        res.status(200).json(club);
    } catch (error) {
        res.status(400).json({ error: `${error.message}` });
    }
};

// Create a new club
const createClub = async (req, res) => {
    
    const {title, description, books, createdBy} = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!description) {
        emptyFields.push('description');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields });
    }

    const create = async (exists, members) => {
        if(exists == '') {
            const club = await Club.create({ title, description, books, members, createdBy });
            res.status(200).json(club);
        } else {
            console.log(exists);
            res.status(400).json({error: `A club with this name already exists`, emptyFields });
        }
    };

    // add doc to db
    try {
        const members = [{
            userId: req.user._id,
            userName: createdBy
        }]
        const exists = await Club.find({ title });
        await create(exists, members);
    } catch (error) {
        res.status(400).json({error: `${error.message}`, emptyFields});
    }
};

module.exports = {
    getClubs,
    getClubsUser,
    addBookToClub,
    removeBookFromClub,
    createClub
};