const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const movieAPI = require('../lib/movieAPI.js');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });

let movies = [];

app.get('/load',  (req, res) => {
  movieAPI.getMovies((err, movieDataFromAPI) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      movies = movieDataFromAPI;
      res.status(200).json(movies);
    }
  });  
});

app.get('/movies',  (req, res) => {
  if(!movies) {
    res.status(500).send({ error: err });
  } else {
    res.status(200).json(movies);
  }

});

app.post('/movie', (req, res) => {
  if(!req.body) {
    res.status(400).send({ error: 'Bad Request' });
  } else {
    movies.push({title: req.body.title, watched: req.body.watched});
    res.status(201).json(movies);
  }
});


