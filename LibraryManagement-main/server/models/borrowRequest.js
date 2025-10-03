const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin who processed
  decisionDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);
