const { Schema, model } = require('mongoose');

const lessonSchema = require('./Lesson');
const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lessons: [lessonSchema],
});
const Course = model('Course', courseSchema);

module.exports = Course;
