class IChatRepository {
  async createChatRoom(chatRoom) {}
  async findChatRoom(bookingId, userId, shopId) {}
  async getChatRoom(id) {}
  async saveMessage(message) {}
  async getMessages(chatRoomId) {}
  async updateChatRoomStatus(chatRoomId, status) {}
  async getActiveChatRoomsForShop(shopId) {}
}

module.exports = IChatRepository;