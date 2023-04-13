const { Schema, model } = require("mongoose");

const countSchema = new Schema({
  value: {
    type: Number,
    default: 0,
  },
});
const Count = model("Count", countSchema);

module.exports = Count;
