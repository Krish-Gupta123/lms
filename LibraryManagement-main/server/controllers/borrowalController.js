const Borrowal = require('../models/borrowal')
const mongoose = require("mongoose");
const Book = require("../models/book");
const { getSocketIO } = require('../socket');

const getBorrowal = async (req, res) => {
    const borrowalId = req.params.id;

    Borrowal.findById(borrowalId, (err, borrowal) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        let penalty = 0;
        if (borrowal && borrowal.dueDate && borrowal.status !== 'returned') {
            const now = new Date();
            const due = new Date(borrowal.dueDate);
            if (now > due) {
                const daysOverdue = Math.floor((now - due) / (1000 * 60 * 60 * 24));
                penalty = daysOverdue * 2;
            }
        }
        return res.status(200).json({
            success: true,
            borrowal,
            penalty
        });
    });
}

const getAllBorrowals = async (req, res) => {
    Borrowal.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "memberId",
                foreignField: "_id",
                as: "member"
            },
        },
        { $unwind: "$member" },
        {
            $lookup: {
                from: "books",
                localField: "bookId",
                foreignField: "_id",
                as: "book"
            },
        },
        { $unwind: "$book" }
    ]).exec((err, borrowals) => {
        if (err) {
            return res.status(400).json({success: false, err});
        }
        // Add penalty field to each borrowal
        const now = new Date();
        const borrowalsWithPenalty = borrowals.map(borrowal => {
            let penalty = 0;
            if (borrowal.dueDate && borrowal.status !== 'returned') {
                const due = new Date(borrowal.dueDate);
                if (now > due) {
                    const daysOverdue = Math.floor((now - due) / (1000 * 60 * 60 * 24));
                    penalty = daysOverdue * 2;
                }
            }
            return { ...borrowal, penalty };
        });
        return res.status(200).json({
            success: true,
            borrowalsList: borrowalsWithPenalty
        });
    })
}

const addBorrowal = async (req, res) => {
    const newBorrowal = {
        ...req.body,
        memberId: mongoose.Types.ObjectId(req.body.memberId),
        bookId: mongoose.Types.ObjectId(req.body.bookId)
    }

    Borrowal.create(newBorrowal, (err, borrowal) => {
        if (err) {
            return res.status(400).json({success: false, err});
        }
        Book.findByIdAndUpdate(newBorrowal.bookId, {isAvailable: false}, (err, book) => {
            if (err) {
                return res.status(400).json({success: false, err});
            }
            // Emit real-time event for book issued
            const io = getSocketIO();
            if (io) {
                io.emit('book:updated', { bookId: newBorrowal.bookId, updatedBook: { isAvailable: false } });
                io.emit('notification', { type: 'book_issued', bookId: newBorrowal.bookId, borrowal });
            }
            return res.status(200).json({
                success: true,
                newBorrowal: borrowal
            });
        });
    })
}

const updateBorrowal = async (req, res) => {
    const borrowalId = req.params.id
    const updatedBorrowal = req.body

    Borrowal.findByIdAndUpdate(borrowalId,updatedBorrowal, (err, borrowal) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        // If status changed to returned, mark book as available
        if (updatedBorrowal.status === 'returned' && borrowal) {
            Book.findByIdAndUpdate(borrowal.bookId, {isAvailable: true}, (err, book) => {
                const io = getSocketIO();
                if (io) {
                    io.emit('book:updated', { bookId: borrowal.bookId, updatedBook: { isAvailable: true } });
                    io.emit('notification', { type: 'book_returned', bookId: borrowal.bookId, borrowal });
                }
            });
        }
        return res.status(200).json({
            success: true,
            updatedBorrowal: borrowal
        });
    })
}

const deleteBorrowal = async (req, res) => {
    const borrowalId = req.params.id
    console.log('deleteBorrowal req.user:', req.user);
    Borrowal.findByIdAndDelete(borrowalId, (err, borrowal) => {
        if (err) {
            return res.status(400).json({success: false, err});
        }
        if (!borrowal) {
            return res.status(404).json({success: false, message: "Borrowal not found"});
        }
        Book.findByIdAndUpdate(borrowal.bookId, {isAvailable: true}, (err, book) => {
            if (err) {
                return res.status(400).json({success: false, err});
            }
            // Emit real-time event for book returned (on delete)
            const io = getSocketIO();
            if (io) {
                io.emit('book:updated', { bookId: borrowal.bookId, updatedBook: { isAvailable: true } });
                io.emit('notification', { type: 'book_returned', bookId: borrowal.bookId, borrowal });
            }
            return res.status(200).json({
                success: true,
                deletedBorrowal: borrowal,
                user: req.user
            });
        });
    })
}

module.exports = {
    getBorrowal,
    getAllBorrowals,
    addBorrowal,
    updateBorrowal,
    deleteBorrowal
}
