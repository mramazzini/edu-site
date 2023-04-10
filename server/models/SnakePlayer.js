const { Schema, model } = require("mongoose");

const snakePlayerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});
const SnakePlayer = model("SnakePlayer", snakePlayerSchema);

module.exports = SnakePlayer;
