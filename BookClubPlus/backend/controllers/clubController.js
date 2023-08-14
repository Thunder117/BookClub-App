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

// create a new club
const createClub = async (req, res) => {
    const {title, description, books, members, createdDate} = req.body;

    // add doc to db
    try {
        const club = await Club.create({title, description, books, members, createdDate});
        res.status(200).json(club);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    getClubs,
    getClub,
    createClub
};