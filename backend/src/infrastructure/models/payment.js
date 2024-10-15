const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  discountApplied: { type: Number, default: 0 },
  paymentStatus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;