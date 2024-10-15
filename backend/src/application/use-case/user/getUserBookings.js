class getUserBookings{
  constructor(bookingRepository){
    this.bookingRepository = bookingRepository;
  }
  async execute(userId){
    return await this.bookingRepository.getUserBookings(userId);
  }
}

module.exports = getUserBookings;