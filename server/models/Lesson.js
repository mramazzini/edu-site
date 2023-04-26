const { Schema, model } = require('mongoose');

const lessonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sections: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
});

module.exports = lessonSchema;
