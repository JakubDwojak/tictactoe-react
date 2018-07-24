const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const gameSchema = new Schema({
  moves: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  player: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  date: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
