const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const movieAPI = require('../lib/movieAPI.js');
const movieDB = require('../database');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });



app.get('/load',  (req, res) => {
  movieAPI.getMovies((err, movieDataFromAPI) => {
    if (err) {
      res.status(500).send({ error: err });
    }

    movieDB.insertMany(movieDataFromAPI, (err) => {
      if(err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).end();
      }
    });    
  });  
});


app.get('/movies',  (req, res) => {
  movieDB.selectAll( (err, movieDataFromDB) => {
    if(err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).json(movieDataFromDB);
    }
  });  
});

app.post('/movie', (req, res) => {
  let newMovie = [req.body.title, 'This is the best movie ever!', '2017-11-11', 0.0, 0, 0];
  
  if(!req.body) {
    res.status(400).send({ error: 'Bad Request' });
  } else {
    movieDB.insertOne(newMovie, (err) => {
      if(err) {
        res.status(500).send({ error: err });
      } else {
        res.status(201).end();
      }
    });
  }
});


