require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const videogameRoutes = require('./routes/videogames');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/reviews');

// express app
const app = express();

app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
// TODO: CHANGE THIS PLEASE
app.use('/api/videogames', videogameRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reviews', reviewRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT || 4000, () => {
            console.log('Connected to db and listening on port 4000');
        });
    })
    .catch((error) => {
        console.log(error);
    });