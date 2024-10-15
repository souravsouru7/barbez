class GetTimeSlots {
    constructor(shopRepository) {
      this.shopRepository = shopRepository;
    }
  
    async execute(shopId) {
      return await this.shopRepository.getTimeSlots(shopId);
    }
  }
  
  module.exports = GetTimeSlots;
  