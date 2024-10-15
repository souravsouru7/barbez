class GetShopBookings {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(shopId) {
    return await this.bookingRepository.getBookingsByShopId(shopId);
  }
}

module.exports = GetShopBookings;