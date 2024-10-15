class BookingController {
  constructor(createBookingUseCase, getUserBookingsUseCase,getShopBookingsWithUserDetails) {
    this.createBookingUseCase = createBookingUseCase;
    this.getUserBookingsUseCase = getUserBookingsUseCase;
   
  }

  async createBooking(req, res) {
    try {
      const booking = await this.createBookingUseCase.execute(req.body);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserBookings(req, res) {
    try {
      const userId = req.params.id; // Get userId from route parameter
      const bookings = await this.getUserBookingsUseCase.execute(userId);
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'An error occurred while fetching bookings' });
    }
  }
}

module.exports = BookingController;