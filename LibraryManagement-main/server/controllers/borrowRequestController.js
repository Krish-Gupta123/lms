const BorrowRequest = require('../models/borrowRequest');
const Book = require('../models/book');
const { getSocketIO } = require('../socket');

// User creates a borrow request
exports.createBorrowRequest = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    // Check if already requested
    const existing = await BorrowRequest.findOne({ user: userId, book: bookId, status: 'pending' });
    if (existing) return res.status(400).json({ message: 'Already requested' });
    const request = new BorrowRequest({ user: userId, book: bookId });
    await request.save();
    // Emit real-time event for new borrow request (reservation)
    const io = getSocketIO();
    if (io) {
      io.emit('reservation:created', { request });
      io.emit('notification', { type: 'reservation_created', request });
    }
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin gets all borrow requests
exports.getAllBorrowRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find().populate('user').populate('book');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin accepts/rejects a request
const Borrowal = require('../models/borrowal');
exports.processBorrowRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action, borrowedDate, dueDate } = req.body; // 'accept' or 'reject', plus dates if accept
    const adminId = req.user._id;
    const request = await BorrowRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status !== 'pending') return res.status(400).json({ message: 'Already processed' });
    const io = getSocketIO();
    if (action === 'accept') {
      request.status = 'accepted';
      // Create a borrowal record
      const borrowal = new Borrowal({
        bookId: request.book,
        memberId: request.user,
        borrowedDate: borrowedDate ? new Date(borrowedDate) : new Date(),
        dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 14*24*60*60*1000), // default 2 weeks
        status: 'borrowed'
      });
      await borrowal.save();
      // Mark book as unavailable
      await Book.findByIdAndUpdate(request.book, { isAvailable: false });
      // Emit real-time event for reservation accepted
      if (io) {
        io.emit('reservation:accepted', { request });
        io.emit('notification', { type: 'reservation_accepted', request });
      }
    } else if (action === 'reject') {
      request.status = 'rejected';
      // Emit real-time event for reservation rejected
      if (io) {
        io.emit('reservation:rejected', { request });
        io.emit('notification', { type: 'reservation_rejected', request });
      }
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
    request.admin = adminId;
    request.decisionDate = new Date();
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
