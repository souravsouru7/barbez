const Booking = require('../../../domain/entities/Booking');

class CreateBookingUseCase {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(bookingData) {
    const booking = new Booking(
      bookingData.userId,
      bookingData.shopId,
      bookingData.service,
      bookingData.bookingDate,
      bookingData.bookingSlot,
      bookingData.status
    );
    return await this.bookingRepository.create(booking);
  }
}

module.exports = CreateBookingUseCase;