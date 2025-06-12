const moviesRepository = require('../repositories/moviesRepository');

const listMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await moviesRepository.getMovies(page);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies', details: err.message });
  }
};

const movieDetails = async (req, res) => {
  const { movieId } = req.params;
  try {
    const details = await moviesRepository.getMovieDetails(movieId);
    if (details) res.json(details);
    else res.status(404).json({ error: 'Movie not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie details', details: err.message });
  }
};

const moviesByYear = async (req, res) => {
  const { year } = req.params;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || 'asc';
  try {
    const movies = await moviesRepository.getMoviesByYear(year, page, 50, sort);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies by year', details: err.message });
  }
};

const moviesByGenre = async (req, res) => {
  const { genre } = req.params;
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await moviesRepository.getMoviesByGenre(genre, page);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies by genre', details: err.message });
  }
};

module.exports = {
  listMovies,
  movieDetails,
  moviesByYear,
  moviesByGenre
};