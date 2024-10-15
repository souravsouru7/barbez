const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  service: {
    serviceName: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }
  },
  bookingDate: { type: Date, required: true },
  bookingSlot: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['confirmed', 'done', 'cancelled'],
    default: 'confirmed'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;