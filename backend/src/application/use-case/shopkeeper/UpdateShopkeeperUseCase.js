// backend/src/application/use-case/shopkeeper/UpdateShopkeeperUseCase.js
class UpdateShopkeeper {
    constructor(shopkeeperRepository, cloudinaryService) {
      this.shopkeeperRepository = shopkeeperRepository;
      this.cloudinaryService = cloudinaryService;
    }
  
    async execute(id, shopkeeperData, imageFilePath) {
      if (imageFilePath) {
        const imageUrl = await this.cloudinaryService.uploadImage(imageFilePath);
        shopkeeperData.profileImage = imageUrl;
      }
      return await this.shopkeeperRepository.updateShopkeeper(id, shopkeeperData);
    }
  }
  
  module.exports = UpdateShopkeeper;
  