const Videogame = require('../models/videogameModel');
const mongoose = require('mongoose');

// get all videogames
const getVideogames = async (req, res) => {
    const videogames = await Videogame.find({}).sort({createdAt: -1});

    res.status(200).json(videogames);
};

// get a single videogame
const getVideogame = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such videogame'})
    }

    const videogame = await Videogame.findById(id);

    if (!videogame) {
        return res.status(404).json({error: 'No such videogame'});
    }

    res.status(200).json(videogame);
};

// create a new videogame
const createVideogame = async (req, res) => {
    const {title, description, launchDate, genre, franchise, developer,
    publisher, imagePath, trailerPath} = req.body;

    // add doc to db
    try {
        const videogame = await Videogame.create({title, description, launchDate,
        genre, franchise, developer, publisher, imagePath, trailerPath});
        res.status(200).json(videogame);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    getVideogames,
    getVideogame,
    createVideogame
};