const { moviesDb, ratingsDb } = require('../config/db');

const getMovies = (page = 1, pageSize = 50) => {
  const offset = (page - 1) * pageSize;
  return new Promise((resolve, reject) => {
    const query = `
      SELECT movieId, title, genres, releaseDate, 
             printf('$%.2f', budget / 1000000.0 * 1000000) AS budget
      FROM movies
      LIMIT ? OFFSET ?;
    `;
    moviesDb.all(query, [pageSize, offset], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getMovieDetails = (movieId) => {
  return new Promise((resolve, reject) => {
    const movieQuery = `
      SELECT movieId, title, overview, releaseDate,
             printf('$%.2f', budget / 1000000.0 * 1000000) AS budget,
             runtime, genres, language, productionCompanies
      FROM movies
      WHERE movieId = ?;
    `;

    moviesDb.get(movieQuery, [movieId], (err, movie) => {
      if (err) return reject(err);
      if (!movie) return resolve(null); // movie not found

      const ratingQuery = `
        SELECT AVG(rating) AS average_rating
        FROM ratings
        WHERE movieId = ?;
      `;

      ratingsDb.get(ratingQuery, [movieId], (err2, ratingRow) => {
        if (err2) return reject(err2);

        movie.average_rating = ratingRow?.average_rating || null;
        resolve(movie);
      });
    });
  });
};

const getMoviesByYear = (year, page = 1, pageSize = 50, sort = 'asc') => {
  const offset = (page - 1) * pageSize;
  const order = sort.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
  return new Promise((resolve, reject) => {
    const query = `
      SELECT movieId, title, genres, releaseDate, 
             printf('$%.2f', budget / 1000000.0 * 1000000) AS budget
      FROM movies
      WHERE strftime('%Y', releaseDate) = ?
      ORDER BY releaseDate ${order}
      LIMIT ? OFFSET ?;
    `;
    moviesDb.all(query, [year, pageSize, offset], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getMoviesByGenre = (genre, page = 1, pageSize = 50) => {
  const offset = (page - 1) * pageSize;
  return new Promise((resolve, reject) => {
    const query = `
      SELECT movieId, title, genres, releaseDate, 
             printf('$%.2f', budget / 1000000.0 * 1000000) AS budget
      FROM movies
      WHERE genres LIKE ?
      LIMIT ? OFFSET ?;
    `;
    moviesDb.all(query, ['%' + genre + '%', pageSize, offset], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

module.exports = {
  getMovies,
  getMovieDetails,
  getMoviesByYear,
  getMoviesByGenre
};