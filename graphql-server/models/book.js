const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema({
   name: String,
   genre: String,
   authorId: String
});

module.exports = model('Book', bookSchema);
