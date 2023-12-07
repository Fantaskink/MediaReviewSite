require('dotenv').config({
    path: `media-review-app-backend/.env.development`
  });

const mediaPool = require('../src/db/media_db');
const axios = require('axios');

api_key = "47d85c8b53b3eca8fc1bad7222460cc0"

function addMovies() {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`)
    .then(response => {
        const movies = response.data.results;

        console.log(movies[0]);
        return;

        movies.forEach((movie, index) => {
            console.log(movie);
            
            const title = movie.title;
            const year = movie.release_date.substring(0, 4);
            const poster = movie.poster_path;
            const overview = movie.overview;
            const tmdb_id = movie.id;
            createFilm(tmdb_id, title, poster, overview, "Director Name", year); // Replace "Director Name" with actual director's name
            
            if (index === 0) {
                return; // Break the function after the first loop
            }
        })
        .catch(error => {
            console.log(error);
        });
}) }

function createFilm(media_url, title, thumbnail_url, description, director, year) {
    mediaPool.query(`
      INSERT INTO media (media_url, title, thumbnail_url, description, type, year)
      VALUES ($1, $2, $3, $4, 'film', $5)
      RETURNING media_id
    `, [media_url, title, thumbnail_url, description, year], (err, res) => {
      if (err) {
        console.error('Error inserting film:', err);
      } else {
        const mediaId = res.rows[0].media_id;
        mediaPool.query(`
          INSERT INTO films (director, media_id)
          VALUES ($1, $2)
        `, [director, mediaId], (err, res) => {
          if (err) {
            console.error('Error inserting film:', err);
          } else {
            console.log('Inserted film:', res);
          }
        });
      }
    });
}

addMovies();