const Club = require('../models/clubModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Get all clubs
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

// Add a book to a club
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

// Remove a book from a club
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

const addMemberToClub = async (req, res) => {
    const { clubId, userId } = req.body;

    console.log(clubId);
    console.log(userId);
    try {
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ error: 'Club not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!club.members.some(member => member.userId.toString() === userId)) {
            club.members.push({ userId: user._id, userName: user.username });
            await club.save();
            return res.status(200).json(club);
        } else {
            return res.status(400).json({ error: 'User is already a member of this club' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a member from a club
const removeMemberFromClub = async (req, res) => {
    const { clubId, userId } = req.body;

    try {
        // Find the club by ID
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ error: 'Club not found' });
        }

        // Check if the user is a member of the club
        const isMember = club.members.some(member => member.userId.toString() === userId);
        if (!isMember) {
            return res.status(404).json({ error: 'User is not a member of this club' });
        }

        // Remove the user from the members array
        club.members = club.members.filter(member => member.userId.toString() !== userId);
        await club.save();

        res.status(200).json(club);  // Return the updated club details
    } catch (error) {
        res.status(500).json({ error: error.message });
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

// Delete a club
const deleteClub = async (req, res) => {
    const { clubId } = req.params;

    try {
        // Find and delete the club by its ID
        const club = await Club.findByIdAndDelete(clubId);

        if (!club) {
            return res.status(404).json({ error: 'Club not found' });
        }

        res.status(200).json({ message: 'Club successfully deleted' });
    } catch (error) {
        res.status(400).json({ error: `${error.message}` });
    }
};

module.exports = {
    getClubs,
    getClubsUser,
    addBookToClub,
    removeBookFromClub,
    addMemberToClub,
    removeMemberFromClub,
    createClub,
    deleteClub
};