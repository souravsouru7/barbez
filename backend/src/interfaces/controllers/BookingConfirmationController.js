const GetBookingConfirmationUseCase = require('../../application/use-case/Booking/GetBookingConfirmation');
const BookingRepositoryImpl = require('../../infrastructure/db/BookingRepositoryImpl');

class BookingConfirmationController {
    constructor(getBookingConfirmationUseCase) {
        this.getBookingConfirmationUseCase = getBookingConfirmationUseCase;
    }

    async getBookingConfirmation(req, res) {
        try {
            const bookingId = req.params.bookingId;
            const confirmationData = await this.getBookingConfirmationUseCase.execute(bookingId);
            res.json(confirmationData);
        } catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An error occurred while fetching the booking confirmation' });
            }
        }
    }
}

// Create and export an instance of BookingConfirmationController
const bookingRepository = new BookingRepositoryImpl();
const getBookingConfirmationUseCase = new GetBookingConfirmationUseCase(bookingRepository);
const bookingConfirmationController = new BookingConfirmationController(getBookingConfirmationUseCase);

module.exports = {
    bookingConfirmationController
};