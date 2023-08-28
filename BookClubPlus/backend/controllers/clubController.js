const Club = require('../models/clubModel');
const mongoose = require('mongoose');

// get all clubs
const getClubs = async (req, res) => {
    const clubs = await Club.find({}).sort({createdAt: -1});

    res.status(200).json(clubs);
};

// get a single club
const getClub = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such club'})
    }

    const club = await Club.findById(id);

    if (!club) {
        return res.status(404).json({error: 'No such club'});
    }

    res.status(200).json(club);
};

// Get all clubs of a user using the user's username
const getClubsUser = async (req, res) => {
    const {id} = req.params;

    const clubs = await Club.find({ createdBy: id } ).sort({createdAt: -1});

    res.status(200).json(clubs);
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
    getClub,
    getClubsUser,
    createClub
};