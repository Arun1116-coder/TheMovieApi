const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.listMovies);
router.get('/details/:movieId', moviesController.movieDetails);
router.get('/year/:year', moviesController.moviesByYear);
router.get('/genre/:genre', moviesController.moviesByGenre);

module.exports = router;