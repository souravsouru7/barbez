class GetActiveChatRoomsForShopUseCase {
    constructor(chatRepository) {
      this.chatRepository = chatRepository;
    }
  
    async execute(shopId) {
      return await this.chatRepository.getActiveChatRoomsForShop(shopId);
    }
  }
  
  module.exports = GetActiveChatRoomsForShopUseCase;