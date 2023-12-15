//bookController.js file
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');

router.get('/seed', async (req, res) => {
    try {
        const booksToInsert = [
            {
                "title": "The Shinobi Initiative",
                "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
                "year": 2014,
                "quantity": 10,
                "imageURL": "https://imgur.com/LEqsHy5.jpeg"
            },
            {   
                "title": "Tess the Wonder Dog",
                "description": "The tale of a dog who gets super powers",
                "year": 2007,
                "quantity": 3,
                "imageURL": "https://imgur.com/cEJmGKV.jpg"
            },
            {
                "title": "The Annals of Arathrae",
                "description": "This anthology tells the intertwined narratives of six fairy tales.",
                "year": 2016,
                "quantity": 8,
                "imageURL": "https://imgur.com/VGyUtrr.jpeg"
            },
            {
                "title": "Wâˆ€RP",
                "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
                "year": 2010,
                "quantity": 4,
                "imageURL": "https://imgur.com/qYLKtPH.jpeg"
            }
        ];

        console.log('Books to insert:', booksToInsert);

        // Omit the '_id' property to let MongoDB generate it
        const insertedBooks = await Book.insertMany(booksToInsert);

        console.log('Inserted books', insertedBooks);

        res.status(200).json({
            message: 'Seed successful'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Seed unsuccessful',
            error: error.message
        });
    }
});

// GET all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new book
router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH/PUT update a book by ID
router.patch('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const updateFields = req.body;

        // Ensure that at least one field is being updated
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Update the book using findOneAndUpdate
        const updatedBook = await Book.findOneAndUpdate(
            { _id: bookId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE remove a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const removedBook = await Book.findByIdAndDelete(req.params.id);
        if (!removedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(removedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router; 