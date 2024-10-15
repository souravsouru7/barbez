const Message = require('../../../domain/entities/Message');

class SendMessageUseCase {
  constructor(chatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(senderId, receiverId, content, chatRoomId) {
    const message = new Message(null, senderId, receiverId, content, chatRoomId);
    return await this.chatRepository.saveMessage(message);
  }
}

module.exports = SendMessageUseCase;