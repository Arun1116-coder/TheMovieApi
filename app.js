require('dotenv').config();
const express = require('express');
const app = express();

const movieRoutes = require('./routes/movies');

app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
