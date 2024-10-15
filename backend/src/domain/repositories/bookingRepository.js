class BookingRepository {
  async create(booking) {
    throw new Error('Method not implemented.');
  }
  async findBookingConfirmationById(bookingId) {
    throw new Error('Method not implemented');
  }
  async getUserBookings(userId) {
    throw new Error('Method not implemented');
  }
  async getBookingsByShopId(shopId) {
    throw new Error('Method not implemented.');
  }
  async findByShopAndDateRange(shopId, startDate, endDate) {
    throw new Error('Method not implemented.');
  }
}

module.exports = BookingRepository;