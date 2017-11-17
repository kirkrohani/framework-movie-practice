const axios = require('axios');
const TMDB_API = require('./api_key.js');

const getMovies = (callback) => {
  axios.get('https://api.themoviedb.org/3/movie/now_playing', {
    params: {api_key: TMDB_API.KEY}
  })
  .then( apiResults => {
    callback(null, apiResults.data.results);
   
  })
  .catch( apiCallError => {
    callback(apiCallError, null);
  });
}

const parseMovies = (movieData) => {
  return movieData.map( movieObj => {
    return [movieObj.id, 
            movieObj.title,
            movieObj.overview,
            movieObj.release_date,
            movieObj.vote_average,
            movieObj.vote_count,
            0
          ]
  });
}

module.exports = {
  getMovies:    getMovies,
  parseMovies:  parseMovies
}