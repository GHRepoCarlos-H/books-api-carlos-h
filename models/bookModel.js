//bookModel.js file
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    year: Number,
    quantity: Number,
    imageURL: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;


 