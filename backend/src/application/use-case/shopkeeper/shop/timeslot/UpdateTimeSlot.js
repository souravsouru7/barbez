class UpdateTimeSlot {
    constructor(shopRepository) {
      this.shopRepository = shopRepository;
    }
  
    async execute(shopId, slotId, updatedSlot) {
      return await this.shopRepository.updateTimeSlot(shopId, slotId, updatedSlot);
    }
  }
  
  module.exports = UpdateTimeSlot;
  