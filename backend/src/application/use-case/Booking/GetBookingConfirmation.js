const BookingConfirmation = require('../../../domain/entities/BookingConfirmation');

class GetBookingConfirmation {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(bookingId) {
    const { booking, payment, shop } = await this.bookingRepository.findBookingConfirmationById(bookingId);
    return new BookingConfirmation(booking, payment, shop);
  }
}

module.exports = GetBookingConfirmation;

// BookingConfirmation.js (entity)
