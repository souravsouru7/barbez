const ChatRoom = require('../../../domain/entities/ChatRoom');

class CreateChatRoomUseCase {
  constructor(chatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(bookingId, userId, shopId) {
    const existingRoom = await this.chatRepository.findChatRoom(bookingId, userId, shopId);
    if (existingRoom) {
      return existingRoom;
    }
    const chatRoom = new ChatRoom(null, bookingId, userId, shopId);
    return await this.chatRepository.createChatRoom(chatRoom);
  }
}

module.exports = CreateChatRoomUseCase;