class ToggleShopWorkModeUseCase {
  constructor(shopRepository) {
    this.shopRepository = shopRepository;
  }

  async execute(shopId) {
    const shop = await this.shopRepository.findById(shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }
    const updatedShopData = {
      isWorkModeOn: !shop.isWorkModeOn
    };
    return await this.shopRepository.updateShop(shopId, updatedShopData);
  }
}

module.exports = ToggleShopWorkModeUseCase;