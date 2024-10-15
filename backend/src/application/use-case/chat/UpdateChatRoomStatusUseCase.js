class UpdateChatRoomStatusUseCase {
    constructor(chatRepository) {
      this.chatRepository = chatRepository;
    }
  
    async execute(chatRoomId, status) {
      return await this.chatRepository.updateChatRoomStatus(chatRoomId, status);
    }
  }
  
  module.exports = UpdateChatRoomStatusUseCase;