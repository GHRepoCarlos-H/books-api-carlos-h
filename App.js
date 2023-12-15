//file app.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const bookController = require('./controllers/books_controller');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/booksAPI')


const db= mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB')
});


// Root index route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/books', bookController);

// Listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});                              


