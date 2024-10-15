class DeleteService {
  constructor(shopRepository) {
    this.shopRepository = shopRepository;
  }

  async execute(shopId, serviceId) {
    console.log(`Attempting to delete service ${serviceId} from shop ${shopId}`);

    const shop = await this.shopRepository.findById(shopId);
    if (!shop) {
      console.error(`Shop not found: ${shopId}`);
      throw new Error('Shop not found');
    }

    console.log(`Shop found. Current services:`, shop.services);

    const serviceIndex = shop.services.findIndex(service => service._id.toString() === serviceId);
    if (serviceIndex === -1) {
      console.error(`Service not found in shop. ServiceId: ${serviceId}`);
      throw new Error('Service not found');
    }

    console.log(`Service found at index ${serviceIndex}. Removing...`);

    // Remove the service from the list
    shop.services.splice(serviceIndex, 1);

    console.log(`Service removed. Updating shop...`);

    const updatedShop = await this.shopRepository.updateShop(shopId, { services: shop.services });
    console.log(`Shop updated successfully`);

    return updatedShop;
  }
}

module.exports = DeleteService;