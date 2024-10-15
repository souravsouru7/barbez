class GetShopById {
    constructor(shopRepository) {
      this.shopRepository = shopRepository;
    }
  
    async execute(shopId) {
      if (!shopId) {
        throw new Error('Shop ID is required');
      }
  
      const shop = await this.shopRepository.findById(shopId);
  
      if (!shop) {
        throw new Error('Shop not found');
      }
  
      return shop;
    }
  }
  
  module.exports = GetShopById;