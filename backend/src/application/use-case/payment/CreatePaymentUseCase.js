const Payment = require("../../../domain/entities/Payment");

class CreatePaymentUseCase {
    constructor(paymentRepository) {
      this.paymentRepository = paymentRepository;
    }
  
    async execute(paymentData) {
      const payment = new Payment(
        paymentData.userId,
        paymentData.bookingId,
        paymentData.paymentMethod,
        paymentData.totalAmount,
        paymentData.discountApplied,
        paymentData.paymentStatus
      );
      return await this.paymentRepository.create(payment);
    }
  }

module.exports = CreatePaymentUseCase;