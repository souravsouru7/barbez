class UpdateService {
    constructor(shopRepository) {
      this.shopRepository = shopRepository;
    }
  
    async execute(shopId, serviceId, updatedService) {
      const shop = await this.shopRepository.findById(shopId);
      if (!shop) {
        throw new Error('Shop not found');
      }
  
      // Find the index of the service in the shop's services array
      const serviceIndex = shop.services.findIndex(service => service._id.toString() === serviceId);
      if (serviceIndex === -1) {
        throw new Error('Service not found');
      }
  
      // Update the service at the found index
      shop.services[serviceIndex] = { ...shop.services[serviceIndex], ...updatedService };
  
      // Use updateShop to persist the changes
      return await this.shopRepository.updateShop(shopId, { services: shop.services });
    }
  }
  
  module.exports = UpdateService;
  