//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Game = require('./game.js')
const app = express();
const bodyparser = require('body-parser');
const url = 'mongodb://localhost:27017/tictactoe';


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/api/games', function(req, res) {
  Game.find({}).then(eachOne => {
    res.json(eachOne);
    })
  })

app.get('/api/games/:id', function(req, res) {
  Game.findById(req.params.id, (err, game)  => {
    if(!err){
      res.json(game);
    } else {
      console.error("Couldn't get entry with id: " + req.params.id);
    }
    })
  });

app.post('/api/games', function(req, res) {
  Game.create({
    moves: req.body.moves,
    player: req.body.player,
    date: req.body.date,
  }).then(game => {
    res.json(game)
  }).catch(err => {
    console.error('Couldn\'t perform post: ' + err);
  })
});

app.delete('/api/games/:id', function(req, res) {
  Game.deleteOne({_id: req.params.id}).then(response => {
    res.json(response)
  }).catch(err => {
    console.error("Couldn't delete entry with id: " + req.params.id);
  })
});

mongoose.connect(url, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to', url);
 }
});

app.listen(process.env.PORT || 5000);
