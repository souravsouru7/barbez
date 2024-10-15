class GetMessagesUseCase {
    constructor(chatRepository) {
      this.chatRepository = chatRepository;
    }
  
    async execute(chatRoomId) {
      return await this.chatRepository.getMessages(chatRoomId);
    }
  }
  
  module.exports = GetMessagesUseCase;