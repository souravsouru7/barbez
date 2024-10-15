const express = require('express');
const router = express.Router();
const { bookingConfirmationController } = require('../controllers/BookingConfirmationController');
const BookingController = require('../controllers/BookingController');
const CreateBookingUseCase = require('../../application/use-case/payment/CreateBookingUseCase');
const GetUserBookingsUseCase = require('../../application/use-case/user/getUserBookings');
const BookingRepositoryImpl = require('../../infrastructure/db/BookingRepositoryImpl');

const bookingRepository = new BookingRepositoryImpl();
const createBookingUseCase = new CreateBookingUseCase(bookingRepository);
const getUserBookingsUseCase = new GetUserBookingsUseCase(bookingRepository);
const bookingController = new BookingController(createBookingUseCase, getUserBookingsUseCase);

router.post('/create', async (req, res, next) => {
  try {
    await bookingController.createBooking(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/confirmation/:bookingId', bookingConfirmationController.getBookingConfirmation.bind(bookingConfirmationController));

router.get('/user-bookings/:id', async (req, res, next) => {
  try {
    await bookingController.getUserBookings(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;