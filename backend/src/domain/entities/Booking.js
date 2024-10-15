class Booking {
    constructor(userId, shopId, service, bookingDate, bookingSlot, status) {
      this.userId = userId;
      this.shopId = shopId;
      this.service = service;
      this.bookingDate = bookingDate;
      this.bookingSlot = bookingSlot;
      this.status = status;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  
  module.exports = Booking;