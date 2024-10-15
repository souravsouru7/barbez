class GetAllShops {
    constructor(shopRepository) {
      this.shopRepository = shopRepository;
    }
  
    async execute() {
      try {
        return await this.shopRepository.getAllShops();
      } catch (error) {
        throw new Error('Error while fetching shops');
      }
    }
  }
  
  module.exports = GetAllShops;
  