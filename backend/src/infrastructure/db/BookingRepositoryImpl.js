const BookingRepository = require('../../domain/repositories/BookingRepository');
const BookingModel = require('../models/booking');
const PaymentModel = require('../models/payment');
const ShopModel = require('../models/ShopModel');

class BookingRepositoryImpl extends BookingRepository {
  async create(booking) {
    const bookingModel = new BookingModel(booking);
    return await bookingModel.save();
  }

  async findBookingConfirmationById(bookingId) {
    const booking = await BookingModel.findById(bookingId).lean();
    if (!booking) {
      throw new Error('Booking not found');
    }

    const payment = await PaymentModel.findOne({ bookingId: booking._id }).lean();
    if (!payment) {
      throw new Error('Payment not found');
    }

    const shop = await ShopModel.findById(booking.shopId).lean();
    if (!shop) {
      throw new Error('Shop not found');
    }

    return { booking, payment, shop };
  }
  async getUserBookings(userId) {
    return await BookingModel.find({ userId }).sort({ bookingDate: -1 });
  }
  async findByShopAndDateRange(shopId, startDate, endDate) {
    const bookings = await BookingModel.find({
      shopId,
      bookingDate: {
        $gte: startDate,
        $lte: endDate
      }
    });
    return bookings.map(booking => ({
      id: booking._id.toString(),
      bookingSlot: booking.bookingSlot 
    }));
  }
  
}

module.exports = BookingRepositoryImpl;