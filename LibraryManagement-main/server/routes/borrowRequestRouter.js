const express = require('express');
const router = express.Router();
const borrowRequestController = require('../controllers/borrowRequestController');
const { ensureAuth, ensureAdmin } = require('../middleware/auth');

// User creates a borrow request
router.post('/', ensureAuth, borrowRequestController.createBorrowRequest);

// Admin gets all borrow requests
router.get('/', ensureAuth, ensureAdmin, borrowRequestController.getAllBorrowRequests);

// Admin processes a request (accept/reject)
router.patch('/:requestId', ensureAuth, ensureAdmin, borrowRequestController.processBorrowRequest);

module.exports = router;
