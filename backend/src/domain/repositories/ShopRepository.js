class ShopRepository {

  async save(){
    throw new Error("Method not implemented");
  }
  async createShop(shop) {
    throw new Error("Method not implemented");
  }

  async findByOwnerId(ownerId) {
    throw new Error("Method not implemented");
  }

  async findById(id) {
    throw new Error("Method not implemented");
  }
async findslotById(id){
 throw new Error("Method not implemented");
}
  async updateShop(id, shopData) {
    throw new Error("Method not implemented");
  }

  async getAllShops() {
    throw new Error("Method not implemented");
  }

  async searchByAddress(query) {
    throw new Error("Method not implemented");
  }

  async updateService(shopId, serviceId, updatedService) {
    throw new Error("Method not implemented");
  }

  async deleteService(shopId, serviceId) {
    throw new Error("Method not implemented");
  }
  async addTimeSlot(shopId, date, startTime, endTime){
    throw new Error("Method not implemented");
  }
  async getTimeSlots(shopId){
    throw new Error("Method not implemented");
  }
  async deleteTimeSlot(shopId, date, startTime, endTime){
    throw new Error("Method not implemented");
  }
  async updateTimeSlot(shopId, timeSlotId, updatedTimeSlot){
    throw new Error("Method not implemented");
  }
  async getBookingsByShopId(shopId) {
    throw new Error('Method not implemented.');
  }
}

module.exports = ShopRepository;
