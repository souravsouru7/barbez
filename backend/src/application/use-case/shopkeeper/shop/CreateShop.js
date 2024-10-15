class CreateShop {
  constructor(shopRepository, cloudinaryService) {
    this.shopRepository = shopRepository;
    this.cloudinaryService = cloudinaryService;
  }

  async execute(shopData, shopImageFile, licenseFile) {
    // Upload images to Cloudinary
    const shopImageUrl = await this.cloudinaryService.uploadImage(shopImageFile);
    const licenseImageUrl = await this.cloudinaryService.uploadImage(licenseFile);

    // Add URLs to the shop data
    shopData.shopimage = shopImageUrl;
    shopData.licenseUrl = licenseImageUrl;

    // Create shop in the repository
    return await this.shopRepository.createShop(shopData);
  }
}

module.exports = CreateShop;
