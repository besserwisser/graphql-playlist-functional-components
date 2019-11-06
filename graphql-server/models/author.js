const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const authorSchema = new Schema({
   name: String,
   age: Number
});

module.exports = model('Author', authorSchema);
