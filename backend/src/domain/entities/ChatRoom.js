class ChatRoom {
  constructor(id, bookingId, userId, shopId, status = 'active', createdAt = new Date(), lastMessageAt = new Date()) {
    this.id = id;
    this.bookingId = bookingId;
    this.userId = userId;
    this.shopId = shopId;
    this.status = status;
    this.createdAt = createdAt;
    this.lastMessageAt = lastMessageAt;
  }
}

module.exports = ChatRoom;