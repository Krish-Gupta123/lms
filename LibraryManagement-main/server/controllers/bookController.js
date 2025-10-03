const Book = require('../models/book')
const mongoose = require("mongoose");
const { getSocketIO } = require('../socket');

const getBook = async (req, res) => {
  const bookId = req.params.id;

  Book.findById(bookId, (err, book) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      book
    });
  });
}

const getAllBooks = async (req, res) => {
  Book.aggregate([{
    $lookup: {
      from: "authors",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
    },
  },
    {
      $unwind: "$author"
    },
    {
      $lookup: {
        from: "genres",
        localField: "genreId",
        foreignField: "_id",
        as: "genre"
      },

    },
    {
      $unwind: "$genre"
    },]).exec((err, books) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      booksList: books
    });
  });
}

const addBook = async (req, res) => {
  const newBook = {
    ...req.body,
    genreId: mongoose.Types.ObjectId(req.body.genreId),
    authorId: mongoose.Types.ObjectId(req.body.authorId)
  }
  console.log(newBook)
  Book.create(newBook, (err, book) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }
    // Emit real-time event for new book
    const io = getSocketIO();
    if (io) {
      io.emit('book:added', { book });
      io.emit('notification', { type: 'book_added', book });
    }
    return res.status(200).json({
      success: true,
      newBook: book
    });
  })
}

const updateBook = async (req, res) => {
  const bookId = req.params.id
  const updatedBook = req.body

  Book.findByIdAndUpdate(bookId, updatedBook, (err, book) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }
    // Emit real-time event for book update (e.g., issue/return)
    const io = getSocketIO();
    if (io) {
      io.emit('book:updated', { bookId, updatedBook });
      io.emit('notification', { type: 'book_updated', bookId, updatedBook });
    }
    return res.status(200).json({
      success: true,
      updatedBook: book
    });
  })
}

const deleteBook = async (req, res) => {
  const bookId = req.params.id

  Book.findByIdAndDelete(bookId, (err, book) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }
    // Emit real-time event for book deletion
    const io = getSocketIO();
    if (io) {
      io.emit('book:deleted', { bookId });
      io.emit('notification', { type: 'book_deleted', bookId });
    }
    return res.status(200).json({
      success: true,
      deletedBook: book
    });
  })
}

module.exports = {
  getBook,
  getAllBooks,
  addBook,
  updateBook,
  deleteBook
}
