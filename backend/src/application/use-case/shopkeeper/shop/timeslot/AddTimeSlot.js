class AddTimeSlot {
  constructor(shopRepository) {
    this.shopRepository = shopRepository;
  }
  
  async execute(shopId, startTime, endTime) {
    const timeSlot = { startTime, endTime };
    return await this.shopRepository.addTimeSlot(shopId, timeSlot);
  }
}

module.exports = AddTimeSlot;