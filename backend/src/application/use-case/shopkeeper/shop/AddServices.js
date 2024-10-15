// application/use-case/shopkeeper/shop/AddServices.js

class AddServices {
    constructor(shopRepository) {
      this.shopRepository = shopRepository;
    }
  
    async execute(shopId, newServices) {
      const shop = await this.shopRepository.findById(shopId);
      if (!shop) {
        throw new Error('Shop not found');
      }
  
    
      shop.services.push(...newServices);
  
      
      return await this.shopRepository.updateShop(shopId, { services: shop.services });
    }
  }
  
  module.exports = AddServices;
  