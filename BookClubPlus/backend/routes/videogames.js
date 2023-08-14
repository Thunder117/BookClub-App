const express = require('express');

// controller functions
const {
    getVideogames,
    getVideogame,
    createVideogame
} = require('../controllers/videogameController');

const router = express.Router();

// GET all videogames
router.get('/', getVideogames);

// GET a single videogame
router.get('/:id', getVideogame);

// POST a new videogame
router.post('/', createVideogame);

// UPDATE a "workout"
// router.patch('/:id', updateWorkout);

module.exports = router;