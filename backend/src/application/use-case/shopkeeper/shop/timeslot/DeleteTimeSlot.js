class DeleteTimeSlot {
    constructor(shopRepository) {
      this.shopRepository = shopRepository;
    }
  
    async execute(shopId, slotId) {
      return await this.shopRepository.deleteTimeSlot(shopId, slotId);
    }
  }
  
  module.exports = DeleteTimeSlot;
  