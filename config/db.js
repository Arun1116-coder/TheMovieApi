const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

const moviesDb = new sqlite3.Database(path.resolve(__dirname, '..', process.env.MOVIES_DB_PATH));
const ratingsDb = new sqlite3.Database(path.resolve(__dirname, '..', process.env.RATINGS_DB_PATH));

module.exports = { moviesDb, ratingsDb };