class Payment {
    constructor(userId, bookingId, paymentMethod, totalAmount, discountApplied, paymentStatus) {
      this.userId = userId;
      this.bookingId = bookingId;
      this.paymentMethod = paymentMethod;
      this.totalAmount = totalAmount;
      this.discountApplied = discountApplied;
      this.paymentStatus = paymentStatus;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }

module.exports = Payment;