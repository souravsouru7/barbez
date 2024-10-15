const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Booking' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  shopId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Shop' },
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  lastMessageAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);